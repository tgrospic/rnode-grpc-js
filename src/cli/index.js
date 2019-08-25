import path from 'path'
import { spawn } from 'child_process'
import fs from 'fs-extra'
import Mode from 'stat-mode'
import * as R from 'ramda'
import { parseArgs } from './args'
import { downloadAll } from './download'
import { generateTs } from './typings'

const { log, error } = console

const blue = txt => `\u001b[34m${txt}\u001b[0m`

// RNode proto files
// TODO: Add support to control files per version (or use Github API)
const proto0_9_12 = {
  types   : ['CasperMessage', 'RhoTypes'],
  services: ['DeployService', 'ProposeService'],
  others  : ['Either', 'routing']
}

const getProtoFilePaths = protoPath => R.pipe(
  Object.values,
  R.flatten,
  R.map(x => path.resolve(protoPath, `${x}.proto`)),
)

const ext = process.platform === 'win32' ? '.cmd' : ''

const generateJsPb = async ({jsPath, protoPath, binPath}) => {
  const npmBin = 'node_modules/.bin'
  const protoc = path.resolve(npmBin, `grpc_tools_node_protoc${ext}`)
  const protocPlugin = path.resolve(npmBin, `grpc_tools_node_protoc_plugin${ext}`)

  const protoFiles = getProtoFilePaths(protoPath)(proto0_9_12)
  const args = [
    `--js_out=import_style=commonjs:${jsPath}`,
    `--grpc_out=${jsPath}`,
    `--grpc-web_out=import_style=commonjs,mode=grpcweb:${jsPath}`,
    `--plugin=protoc-gen-grpc=${protocPlugin}`,
    `--plugin=${binPath}/protoc-gen-grpc-web`,
    `-I${protoPath}`,
    `${protoPath}/scalapb/scalapb.proto`,
    ...protoFiles,
  ]
  const protocExe = spawn(protoc, args, {stdio: 'inherit'})

  return waitExit(protocExe, null, `Failed to generate JS files with grpc-tools.`)
}

const generateJsonPb = async ({jsPath, protoPath}) => {
  const npmBin = 'node_modules/.bin'
  const pbjs = path.resolve(npmBin, `pbjs${ext}`)
  const jsonPath = `${jsPath}/pbjs_generated.json`
  const args = [
    `-t`, `json`,
    `-o`, jsonPath,
    `${protoPath}/scalapb/*.proto`,
    `${protoPath}/*.proto`
  ]
  const pbExe = spawn(pbjs, args, {stdio: 'inherit'})

  return waitExit(pbExe, jsonPath, `Failed to generate JSON schema with pbjs.`)
}

const waitExit = (proc, result, error) =>
  new Promise((resolve, reject) => {
    proc.on('exit', code => {
      code === 0 ? resolve(result) : reject(error)
    })
  })

export const run = async ({args, cwd}) => {
  // Input options
  const options = parseArgs(args)
  const {
    'rnode-version': version='v0.9.12',
    'grpc-web-version': grpcWebVersion='1.0.6',
    'gen-dir': genDirRel='rnode-grpc-gen',
  } = options

  log(blue('RNode gRPC versions'), { 'rnode-version': version, 'grpc-web-version': grpcWebVersion })

  // Directory paths
  const dirPath = path.resolve(cwd, genDirRel)
  const protoPath = path.resolve(dirPath, 'proto')
  const scalapbPath = path.resolve(protoPath, 'scalapb')
  const binPath = path.resolve(dirPath, 'bin')
  const jsPath = path.resolve(dirPath, 'js')

  // Protoc `grpc-web` plugin download params
  const grpcWebUrlPrefix = 'https://github.com/grpc/grpc-web/releases/download/'
  const [platformName, ext] = process.platform === 'win32'
    ? ['windows', '.exe'] : [process.platform, '']
  // Resolve `protoc-gen-grpc-web` file name
  const grpcWebFileName = `protoc-gen-grpc-web-${grpcWebVersion}-${platformName}-x86_64${ext}`
  const filePath = path.resolve(binPath, 'protoc-gen-grpc-web')
  const downloadUrl = grpcWebUrlPrefix + grpcWebVersion + '/' + grpcWebFileName
  const grpcWebDownload = { filePath, downloadUrl }

  // Proto files download params
  const protoUrlPrefix = `https://raw.githubusercontent.com/rchain/rchain/${version}/models/src/main/protobuf/`
  const protoDownloads = R.pipe(
    Object.values,
    R.flatten,
    R.map(x => ({ downloadUrl: `${protoUrlPrefix}${x}.proto`, filePath: path.resolve(protoPath, `${x}.proto`) })),
  )
  // Additional proto file not in RChain repo
  const scalapbDownload = {
    downloadUrl: 'https://raw.githubusercontent.com/scalapb/ScalaPB/master/protobuf/scalapb/scalapb.proto',
    filePath: path.resolve(scalapbPath, 'scalapb.proto'),
  }

  // All downloads
  const downloads = [
    grpcWebDownload,
    ...protoDownloads(proto0_9_12),
    scalapbDownload,
  ]

  // Cleanup existing files and ensure directory structure
  await fs.remove(dirPath)
  await fs.ensureDir(protoPath)
  await fs.ensureDir(scalapbPath)
  await fs.ensureDir(binPath)
  await fs.ensureDir(jsPath)

  log(blue('Startinmg downloads...'))

  // Download all files
  await downloadAll(downloads)

  // Set `protoc-gen-grpc-web` plugin executable
  const stat = await fs.stat(filePath)
  const mode = Mode(stat)
  mode.owner.execute = true
  mode.group.execute = true
  mode.others.execute = true

  await fs.chmod(filePath, mode.stat.mode)

  log(blue('Generating JS files...'))

  // Generate JS code from proto files (with grpc-tools)
  await generateJsPb({jsPath, protoPath, binPath})

  // Generate JSON definition from proto files (with protobufjs)
  const jsonPath = await generateJsonPb({jsPath, protoPath})

  // Load generated pbjs JSON schema
  const protoSchema = require(jsonPath)

  log(blue('Generating Typescript definitions...'))

  // Generate Typescript definitions
  await generateTs({jsPath, protoPath, protoSchema})
}

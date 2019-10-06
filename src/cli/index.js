import path from 'path'
import { spawn } from 'child_process'
import fs from 'fs-extra'
import * as R from 'ramda'
import { parseArgs } from './args'
import { downloadAll, fetch } from './download'
import { generateTs } from './typings'
import { mapAsync, chainAsync, waitExit, then, filterAsync } from '../lib'

// Relative location of directories where protobuf files are located
// in RChain main repository https://github.com/rchain/rchain
const rchainProtoDirs = ['models/src/main/protobuf', 'node/src/main/protobuf']

const { log, error } = console

const blue = txt => `\u001b[34m${txt}\u001b[0m`

const ext = process.platform === 'win32' ? '.cmd' : ''

const npmBin = 'node_modules/.bin'

const generateJsPb = async ({jsPath, protoPath, protoFiles}) => {
  const protoc = path.resolve(npmBin, `grpc_tools_node_protoc${ext}`)
  const args = [
    `--js_out=import_style=commonjs:${jsPath}`,
    `-I${protoPath}`,
    ...protoFiles,
  ]
  const protocExe = spawn(protoc, args, {stdio: 'inherit'})

  return waitExit(protocExe, null, `Failed to generate JS files with grpc-tools.`)
}

const generateJsonPb = async ({jsPath, protoFiles}) => {
  const pbjs = path.resolve(npmBin, `pbjs${ext}`)
  const jsonPath = `${jsPath}/pbjs_generated.json`
  const args = [
    `-t`, `json`,
    `-o`, jsonPath,
    '--keep-case',
    ...protoFiles,
  ]
  const pbExe = spawn(pbjs, args, {stdio: 'inherit'})

  return waitExit(pbExe, jsonPath, `Failed to generate JSON schema with pbjs.`)
}

export const run = async ({args, cwd}) => {
  // Input options
  const options = parseArgs(args)
  const {
    'rnode-version': version='v0.9.12',
    'gen-dir': genDirRel='rnode-grpc-gen',
  } = options

  log(blue('RNode gRPC versions'), { 'rnode-version': version })

  // Directory paths
  const dirPath = path.resolve(cwd, genDirRel)
  const protoPath = path.resolve(dirPath, 'proto')
  const scalapbPath = path.resolve(protoPath, 'scalapb')
  const jsPath = path.resolve(dirPath, 'js')

  // Get proto files with Github API
  const githubListFilesUrl = dir =>
    `https://api.github.com/repos/rchain/rchain/contents/${dir}?ref=${version}`

  const fetchProtoListFromGithub = dir => fetch({
    url: githubListFilesUrl(dir),
    headers: { 'User-Agent': 'rnode-grpc-js generator for RChain RNode API' },
    json: true,
  })

  // Proto files download params
  const protoDownload = ({name, download_url}) =>
    ({ downloadUrl: download_url, filePath: path.resolve(protoPath, name) })

  // Additional proto file not in RChain repo
  const scalapbDownload = {
    downloadUrl: 'https://raw.githubusercontent.com/scalapb/ScalaPB/master/protobuf/scalapb/scalapb.proto',
    filePath: path.resolve(scalapbPath, 'scalapb.proto'),
  }

  // Fetch info of all proto files
  const protoDownloads = await R.pipe(
    chainAsync(fetchProtoListFromGithub),
    filterAsync(({name}) => name !== 'routing.proto'),
    mapAsync(protoDownload),
    then(R.append(scalapbDownload)),
  )(rchainProtoDirs)

  // Cleanup existing files and ensure directory structure
  const newDirs = [protoPath, scalapbPath, jsPath]
  await fs.remove(dirPath)
  await mapAsync(fs.ensureDir, newDirs)

  log(blue('Startinmg downloads...'))

  // Download all files
  await downloadAll(protoDownloads)

  log(blue('Generating JS files...'))

  const protoFiles = R.map(R.prop('filePath'), protoDownloads)

  // Generate JS code from proto files (with grpc-tools)
  await generateJsPb({jsPath, protoPath, protoFiles})

  // Generate JSON definition from proto files (with protobufjs)
  const jsonPath = await generateJsonPb({jsPath, protoFiles})

  // Load generated pbjs JSON schema
  const protoSchema = require(jsonPath)

  log(blue('Generating TypeScript definitions...'))

  // Generate TypeScript definitions
  await generateTs({jsPath, protoPath, protoSchema, version})
}

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

/**
 * Generate JS bindings with native `grpc-tools` library.
 */
const generateJsPb = async ({jsPath, protoPath, protoFiles, npmBin}) => {
  const protoc = path.resolve(npmBin, `grpc_tools_node_protoc${ext}`)
  const args = [
    `--js_out=import_style=commonjs:${jsPath}`,
    `-I${protoPath}`,
    ...protoFiles,
  ]
  const protocExe = spawn(protoc, args, {stdio: 'inherit'})

  return waitExit(protocExe, null, `Failed to generate JS files with grpc-tools.`)
}

/**
 * Generate JSON representation of protobuf types with `protobufjs` library.
 */
const generateJsonPb = async ({jsPath, protoFiles, npmBin}) => {
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

/**
 * Run RChain client gRPC/protobuf API generator.
 *
 * - download protobuf definition files from GitHub rchain/rchain
 * - generate JS bindings (grpc-tools)
 * - generate JSON schema (protobufjs)
 * - generate TypeScript definitions
 */
export const run = async ({args, cwd, npmBin}) => {
  // Input options
  const options = parseArgs(args)
  const {
    'rnode-version': version='v0.12.4',
    'gen-dir': genDirRel='rnode-grpc-gen',
    'include-reflection': includeReflection=false,
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

  const reflectionDownload = {
    downloadUrl: 'https://raw.githubusercontent.com/grpc/grpc/v1.24.1/src/proto/grpc/reflection/v1alpha/reflection.proto',
    filePath: path.resolve(protoPath, 'reflection.proto'),
  }

  // Fetch info of all proto files
  const protoDownloads = await R.pipe(
    chainAsync(fetchProtoListFromGithub),
    filterAsync(({name}) => name !== 'routing.proto'),
    mapAsync(protoDownload),
    then(R.append(scalapbDownload)),
    then(includeReflection ? R.append(reflectionDownload) : R.identity),
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
  await generateJsPb({jsPath, protoPath, protoFiles, npmBin})

  // Generate JSON definition from proto files (with protobufjs)
  const jsonPath = await generateJsonPb({jsPath, protoFiles, npmBin})

  // Append fix to Expr type primitive fields
  await addFixExprPrimitiveFields(jsPath)

  // Load generated pbjs JSON schema
  const protoSchema = require(jsonPath)

  log(blue('Generating TypeScript definitions...'))

  // Generate TypeScript definitions
  await generateTs({jsPath, protoPath, protoSchema, version})
}

/**
 * Fix for primitive fields in Expr type.
 * https://github.com/rchain/rchain/issues/3566
 *
 * RNode uses protobuf v3 format which doesn't serialize default values for primitive types.
 * RNode overrides this behavior for Rholang types, so fields with primitive values are
 * always serialized, even containing default values.
 * JS generated code with grpc-tools will set default values for not serialized fields which
 * makes it impossible to detect in Expr type which field is really set.
 * This fix overrides `toObject` generated function with detection of non-serialized fields
 * of Expr type and sets them to undefined.
 */
async function addFixExprPrimitiveFields(jsPath) {
  const rhoTypesJs = path.resolve(jsPath, `RhoTypes_pb.js`)

  const patch = `\n
/**
 * Fix for primitive fields in Expr type.
 * https://github.com/rchain/rchain/issues/3566
 *
 * RNode uses protobuf v3 format which doesn't serialize default values for primitive types.
 * RNode overrides this behavior for Rholang types, so fields with primitive values are
 * always serialized, even containing default values.
 * JS generated code with grpc-tools will set default values for not serialized fields which
 * makes it impossible to detect in Expr type which field is really set.
 * This fix detects non-serialized fields of Expr type and sets them to undefined.
 */
const originExprToObject = proto.Expr.toObject

const patchFields = [
  ['gBool'     ,  1],
  ['gInt'      ,  2],
  ['gString'   ,  3],
  ['gUri'      ,  4],
  ['gByteArray', 25],
]

function deleteFieldIfEmpty(msg, exprObj, name, fieldNr) {
  const v = jspb.Message.getField(msg, fieldNr)
  if (v === void 666 || v === null) exprObj[name] = void 666
}

proto.Expr.toObject = function(includeInstance, msg) {
  const expr = originExprToObject.call(includeInstance, includeInstance, msg)
  patchFields.forEach(([name, pos]) => deleteFieldIfEmpty(msg, expr, name, pos))
  return expr
}
`
  await fs.appendFile(rhoTypesJs, patch, 'utf8')
}

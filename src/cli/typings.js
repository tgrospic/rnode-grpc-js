import fs from 'fs-extra'
import path from 'path'
import * as R from 'ramda'
import { protoTsTypesMapping, flattenSchema, mapAsync, filterAsync, then } from '../lib'

const { log } = console

const { readFile, writeFile, readdir, stat } = fs

const isFile = async checkPath => {
  const s = await stat(checkPath)
  return s.isFile()
}

const readProtoFiles = protoPath => R.pipeWith(then, [
  readdir,
  mapAsync(async fileName => path.resolve(protoPath, fileName)),
  filterAsync(isFile),
  mapAsync(fp => readFile(fp, 'utf8')),
])(protoPath)

// Parse service name
const serviceRegex = /service\s+([a-zA-Z0-9_-]+)/

// Parse method definition with previous comment where is the return type
const serviceMethodRegex =
  /(\/\/ Returns on success ([a-zA-Z0-9_-]+)\s+)?rpc\s+([a-zA-Z0-9_-]+)\(([a-zA-Z0-9_-]+)\)\s*returns\s*\(\s*(stream)?\s*Either\s*\)\s*{\s*}/g

const parseProto = protoStr => {
  const [_, service] = protoStr.match(serviceRegex) || []
  const matches = Array.from(protoStr.matchAll(serviceMethodRegex))
  const methodInfo = ([,,outType, name, inType, stream]) =>
    ({name, inType, outType, isStream: stream === 'stream'})
  const toObj = (acc, {name, outType}) => ({ ...acc, [name]: outType })
  const methods = matches.map(methodInfo).reduce(toObj, {})
  if (!R.isEmpty(methods)) {
    return { [service]: methods }
  }
}

const parseProtoReponseMeta = R.pipe(R.map(parseProto), R.reject(R.isNil), R.mergeAll)

const methodResolveResponse = (service, meta) => (method, name) => {
  const { requestType, responseType, responseStream } = method
  const eitherTypeLens = R.lensPath([service, name])
  const eitherType = R.view(eitherTypeLens, meta)
  const isResponseEither = responseType === 'Either'
  // Replace Either with correct type
  const outType = isResponseEither ? eitherType : responseType

  return { name, requestType, responseType: outType, responseStream }
}

const serviceResolveResponse = meta => ({name, methods}) =>
  ({name, methods: R.mapObjIndexed(methodResolveResponse(name, meta), methods)})

// Type helpers
const getTsType = protoType => R.find(x => x.proto === protoType, protoTsTypesMapping)

// Generates service method
const methodCodeGen = getType => ([name, {requestType, responseType, responseStream}]) => {
  // Empty method arguments for Google Protobuf Empty type
  const methodArg = requestType == 'google.protobuf.Empty'
    ? () => '()'
    : () => {
      const {fields} = getType(requestType)
      const isSimpleType = ({type}) => getTsType(type)
      const nullable = R.all(isSimpleType, Object.values(fields || {})) ? '?' : ''
      return `(_${nullable}: ${requestType})`
    }
  const suffix = responseStream ? '[]' : ''

  return `${name}${methodArg()}: Promise<${responseType || 'Unit'}${suffix}>`
}

// Generates code for service interface
const serviceCodeGen = getType => ({name, methods}) =>
  // Indentation is important, it's used in generated file
  `interface ${name} {
    ${Object.entries(methods).map(methodCodeGen(getType)).join('\n    ')}
  }`

// Generates code for type field (property)
const fieldCodeGen = (nullables, key, {type, rule}) => {
  const tsType = getTsType(type)
  const isList = rule === 'repeated'
  const nullable = tsType || isList || R.includes(key, nullables) ? '?' : ''
  const suffixList = isList ? '[]' : ''
  const origType = tsType && tsType.ts !== type ? ` /* ${type} */` : ''
  return tsType
    ? `readonly ${key}${nullable}: ${tsType.ts}${suffixList}${origType}`
    : `readonly ${key}${nullable}: ${type}${suffixList}`
}

// Generates code for type interface
const typeCodeGen = ({name, fields, nullables}) => {
  const fieldGenKV = ([k, field]) => fieldCodeGen(nullables, k, field)
  const isServiceError = ([k, {type}]) => k === 'error' && type === 'ServiceError'
  const genFields = R.pipe(Object.entries, R.reject(isServiceError), R.map(fieldGenKV))
  // Indentation is important, it's used in generated file
  return `interface ${name} {
    ${genFields(fields).join('\n    ')}
  }`
}

// Generates code for binary operations (exposed from generated JS code)
const binaryOpCodeGen = ({name}) => {
  // Indentation is important, it's used in generated file
  return `readonly ${name}: BinaryOp<${name}>`
}

export const generateTs = async ({jsPath, protoPath, protoSchema, version}) => {
  // Schema definition
  const schemaFlat = R.chain(flattenSchema([]), [protoSchema])
  const types = R.filter(R.propEq('type', 'type'), schemaFlat)
  const getType = name => R.find(R.propEq('name', name), types)
  const getServices = meta => R.pipe(
    R.filter(R.propEq('type', 'service')),
    R.map(serviceResolveResponse(meta)),
  )(schemaFlat)

  // Read proto files and TypeScript definition template
  const protoFiles   = await readProtoFiles(protoPath)
  const servicesMeta = parseProtoReponseMeta(protoFiles)
  const services     = getServices(servicesMeta)
  const tmplTsPath   = path.resolve(__dirname, '../../src-template/rnode-grpc-js-tmpl.d.ts')
  const tmplTs       = await readFile(tmplTsPath, 'utf8')
  const tsGenPath    = path.resolve(jsPath, 'rnode-grpc-js.d.ts')
  const schemaPath   = path.resolve(jsPath, 'rnode-api-schema.json')

  // Generate services and types
  const servicesGen = R.map(serviceCodeGen(getType), services)
  const typesGen    = R.map(typeCodeGen, types)
  const binaryGen   = R.map(binaryOpCodeGen, types)

  // Replace in template
  const tsGen1 = tmplTs.replace('/*__SERVICES__*/', servicesGen.join('\n\n  '))
  const tsGen2 = tsGen1.replace('/*__TYPES__*/', typesGen.join('\n\n  '))
  const tsGen3 = tsGen2.replace('/*__TYPES_BINARY__*/', binaryGen.join('\n    '))
  const tsGen4 = tsGen3.replace('__RNODE_VERSION__', version)

  // Write generated TypeScript file
  await writeFile(tsGenPath, tsGen4)

  // Write flatten API schema
  await writeFile(schemaPath, JSON.stringify(schemaFlat, null, 2))
}

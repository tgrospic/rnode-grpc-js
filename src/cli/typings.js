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

// Generates service method
const genMethodCode = ([name, {requestType, responseType, responseStream}]) => {
  const suffix = responseStream ? '[]' : ''
  return `${name}(_: ${requestType}): Promise<${responseType || 'Unit'}${suffix}>`
}

// Generates code for service interface
const serviceCodeGen = ({name, methods}) =>
  // Indentation is important, it's used in generated file
  `interface ${name} {
    ${Object.entries(methods).map(genMethodCode).join('\n    ')}
  }`

// Type helpers
const simpleTypes = R.map(R.prop('proto'), protoTsTypesMapping)
// TODO: add support to generate nested types
const nestedTypes = ['WildcardMsg']
const isSimpleType = type => R.contains(type, [...simpleTypes, ...nestedTypes])
const getTsType = protoType => R.find(x => x.proto === protoType, protoTsTypesMapping)

// Generates code for type interface
const typeCodeGen = ({name, fields, nested}) => {
  const showFieldType = ({type, rule}) => {
    const tsType = getTsType(type)
    const suffixList = rule === 'repeated' ? '[]' : ''
    const origType = tsType && tsType.ts !== type ? ` /* ${type} */` : ''
    return tsType
      ? `${tsType.ts}${suffixList}${origType}`
      : `${type}${suffixList}`
  }
  // Indentation is important, it's used in generated file
  return `interface ${name} {
    ${Object.entries(fields).map(([k, field]) => `${k}: ${showFieldType(field)}`).join('\n    ')}
  }`
}

// Generates code for binary operations (exposed from generated JS code)
const binaryOpCodeGen = ({name}) => {
  // Indentation is important, it's used in generated file
  return `${name}: BinaryOp<${name}>`
}

export const generateTs = async ({jsPath, protoPath, protoSchema}) => {
  // Schema definition
  const schemaFlat = R.chain(flattenSchema([]), [protoSchema])
  const types = R.filter(R.propEq('type', 'type'), schemaFlat)
  const getTypeDef = name => R.find(R.propEq('name', name), types)
  const getServices = meta => R.pipe(
    R.filter(R.propEq('type', 'service')),
    R.map(serviceResolveResponse(meta)),
  )(schemaFlat)

  // Returns type definition by type name (from protobufjs JSON)
  const getTypeSchema = buffer => name => {
    if (R.contains(name, buffer)) return []
    const { fields, ...rest } = getTypeDef(name)
    const getType = ([_, {type}]) => isSimpleType(type) ? [] : getTypeSchema([name, ...buffer])(type)
    const fieldsTypes = R.pipe(Object.entries, R.chain(getType))(fields)

    return [{name, fields, ...rest}, ...fieldsTypes]
  }

  // Read proto files and TypeScript definition template
  const protoFiles   = await readProtoFiles(protoPath)
  const servicesMeta = parseProtoReponseMeta(protoFiles)
  const services     = getServices(servicesMeta)
  const tmplTsPath   = path.resolve(__dirname, './rnode-grps-js-tmpl.d.ts')
  const tmplTs       = await readFile(tmplTsPath, 'utf8')
  const tsGenPath    = path.resolve(jsPath, 'rnode-grps-js.d.ts')

  // Generate services and types
  const servicesGen = R.map(serviceCodeGen, services)
  const typesGen    = R.map(typeCodeGen, types)
  const binaryGen   = R.map(binaryOpCodeGen, types)

  // Replace in template
  const tsGen1 = tmplTs.replace('/*__SERVICES__*/', servicesGen.join('\n\n  '))
  const tsGen2 = tsGen1.replace('/*__TYPES__*/', typesGen.join('\n\n  '))
  const tsGen3 = tsGen2.replace('/*_TYPES_BINARY_*/', binaryGen.join('\n    '))

  // Write generated TypeScript file
  await writeFile(tsGenPath, tsGen3)
}

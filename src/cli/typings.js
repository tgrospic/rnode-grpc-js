import fs from 'fs-extra'
import path from 'path'
import * as R from 'ramda'
import { protoTsTypesMapping } from '../lib'

const { log } = console

const { readFile, writeFile, readdir, stat } = fs.promises

const isFile = async checkPath => {
  const s = await stat(checkPath)
  return s.isFile()
}

const thenAll = ps => Promise.all(ps)

const then = (f, p) => p.then(f)

const mapAsync = R.curry(async (f, xs) => thenAll(R.map(f, await xs)))

const filterAsync = R.curry(async (pred, xs) => {
  const predX = async x => ({ p: await pred(x), x })
  const predXs = await mapAsync(predX, await xs)
  return R.pipe(
    R.filter(R.prop('p')),
    mapAsync(R.prop('x'))
  )(predXs)
})

const isNotNil = R.pipe(R.isNil, R.not)

const readProto = protoPath => R.pipeWith(then, [
  readdir,
  mapAsync(async fileName => path.resolve(protoPath, fileName)),
  filterAsync(isFile),
  mapAsync(R.flip(readFile)('utf8')),
])(protoPath)

// Parse service name
const serviceRegex = /service\s+([a-zA-Z0-9_-]+)/

// Parse method definition with previous comment where is the return type
const serviceMethodRegex =
  /(\/\/ Returns on success ([a-zA-Z0-9_-]+)\s+)?rpc\s+([a-zA-Z0-9_-]+)\(([a-zA-Z0-9_-]+)\)\s*returns\s*\(\s*(stream)?\s*Either\s*\)\s*{\s*}/g

const parseProtoServices = protoStr => {
  const [_, service] = protoStr.match(serviceRegex) || []
  const matches = Array.from(protoStr.matchAll(serviceMethodRegex))
  const serviceInfo = ([,,outType, name, inType, stream]) =>
    ({name, inType, outType, isStream: stream === 'stream'})
  const methods = matches.map(serviceInfo)
  if (!R.isEmpty(methods)) {
    return { service, methods }
  }
}

const readServices = R.pipe(R.map(parseProtoServices),R.filter(isNotNil))

export const generateTs = async ({jsPath, protoPath, protoSchema}) => {
  // Generates service method
  const genMethodCode = ({name, inType, outType, isStream}) => {
    const suffix = isStream ? '[]' : ''
    return `${name}(_: ${inType}): Promise<${outType || 'Unit'}${suffix}>`
  }

  // Generates code for service interface
  const serviceCodeGen = ({service, methods}) =>
    // Indentation is important, it's used in generated file
  `interface ${service} {
    ${methods.map(genMethodCode).join('\n    ')}
  }`

  // Generates services definitions
  const generateServices = R.map(serviceCodeGen)

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
      const suffix = rule === 'repeated' ? '[]' : ''
      return tsType
        ? `${tsType.ts}${suffix} /* ${type} */`
        : `${type}${suffix}`
    }
    // Indentation is important, it's used in generated file
  return `interface ${name} {
    ${Object.entries(fields).map(([k, field]) => `${k}: ${showFieldType(field)}`).join('\n    ')}
  }`
  }

  const getTypeSchema = buffer => name => {
    if (R.contains(name, buffer)) return []
    const { fields, ...rest } = getTypeDef(name)
    const getType = ([k, {type}]) => isSimpleType(type) ? [] : getTypeSchema([name, ...buffer])(type)
    const fieldsTypes = R.pipe(Object.entries, R.chain(getType))(fields)

    return [{name, fields, ...rest}, ...fieldsTypes]
  }

  // Generate all types defined in services methods
  const generateTypes = R.pipe(
    R.chain(R.prop('methods')),
    R.chain(({inType, outType}) => [inType, outType]),
    R.filter(isNotNil),
    R.chain(getTypeSchema([])),
    R.map(typeCodeGen),
  )

  // Read proto files and Typescript definition template
  const protoFiles = await readProto(protoPath)
  const services   = readServices(protoFiles)
  const tmplTsPath = path.resolve(__dirname, './rnode-grps-js-tmpl.d.ts')
  const tmplTs     = await readFile(tmplTsPath, 'utf8')
  const tsGenPath  = path.resolve(jsPath, 'rnode-grps-js.d.ts')
  // Schema types
  const casperTypes = protoSchema.nested.coop.nested.rchain.nested.casper.nested.protocol.nested
  const getTypeDef  = name => casperTypes[name] || protoSchema.nested[name]

  // Generate services and types
  const servicesGen = generateServices(services)
  const typesGen    = generateTypes(services)

  // Replace in template
  const tsGen1 = tmplTs.replace('/*__SERVICES__*/', servicesGen.join('\n\n  '))
  const tsGen2 = tsGen1.replace('/*__TYPES__*/', typesGen.join('\n\n  '))

  // Write generated Typescript file
  await writeFile(tsGenPath, tsGen2)
}

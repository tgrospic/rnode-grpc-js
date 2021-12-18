import * as R from 'ramda'
import { ChildProcess } from 'node:child_process'

// Mapping protobuf (simple) types to TypeScript types
export const protoTsTypesMapping = [
  { proto: 'bool'  , ts: 'boolean' },
  { proto: 'string', ts: 'string' },
  { proto: 'int32' , ts: 'number' },
  { proto: 'uint32', ts: 'number' },
  { proto: 'sint32', ts: 'number' },
  { proto: 'int64' , ts: 'number' },
  { proto: 'uint64', ts: 'number' },
  { proto: 'sint64', ts: 'number' },
  { proto: 'float' , ts: 'number' },
  { proto: 'double', ts: 'number' },
  { proto: 'bytes' , ts: 'Uint8Array' },
]

const ignoredNamespaces = [
  ['scalapb'],
  ['google', 'protobuf'],
  ["coop", "rchain", "comm", "protocol", "routing"],  // v0.9.12
  ["routing"],                                        // v0.9.14
]

// Transform generated (protobufjs) JSON to a flat list of services and types
export const flattenSchema = (parentPath: any) => (schema: any) => {
  const nestedProps = R.prop('nested', schema)
  const getProps: any = R.pipe(
    Object.entries as any,
    R.chain(([name, v]) => {
      const {methods, fields, nested} = v
      const namespace = parentPath
      if (methods)
        return { namespace, type: 'service', name, methods }
      else if (fields) {
        // Fix fields names the same way as protoc JS generator
        const fixName = (name: string) => {
          const { rule } = fields[name]
          const isList = rule === 'repeated'
          const listSuffix = isList ? 'List' : ''
          const genName = name.toLowerCase().replace(/_(\S)/g, (_, x) => x.toUpperCase())
          return `${genName}${listSuffix}`
        }
        const fixFieldName = (acc: any, [k, v]: [any, any]) => {
          const fieldName = fixName(k)
          return {...acc, [fieldName]: v}
        }
        const fieldsFixed = R.pipe(Object.entries, R.reduce(fixFieldName, {}))
        const nullables = R.pipe(
          R.propOr({}, 'oneofs'), Object.values, R.chain(R.prop('oneof')) as any, R.map(fixName)
        )(v)
        return { namespace, type: 'type', name, fields: fieldsFixed(fields), nullables }
      }
      else if (nested)
        return R.chain(flattenSchema([...parentPath, name]), [v])
      else
        // Not important fields (scalapb options, ...)
        return
    }),
    R.reject(R.isNil),
    R.reject(({namespace}) => R.contains(namespace, ignoredNamespaces)),
  )
  return getProps(nestedProps || {})
}

type MapBindPromise<a, b> = (a: a) => b | ((a: a) => Promise<b>)

export const then = R.curry((f: MapBindPromise<any, any>, p: Promise<any>) => p.then(f))

export const thenAll: typeof Promise.all = Promise.all.bind(Promise)

export const mapAsync = R.curry(async (f: MapBindPromise<any, any>, xs) => thenAll(R.map(f, await xs)))

export const chainAsync = R.curry(async (f: MapBindPromise<any, any>, xs) => R.flatten(await mapAsync(f, await xs)))

export const filterAsync = R.curry(async (pred, xs) => {
  const predX = async (x: any) => ({ p: await pred(x), x })
  const predXs = await mapAsync(predX, await xs)
  return R.pipe(
    R.filter(R.prop('p') as any),
    mapAsync(R.prop('x')),
  )(predXs as any)
})

export const waitExit = (proc: ChildProcess, result: any, error: any) =>
  new Promise((resolve, reject) => {
    proc.on('exit', code => {
      code === 0 ? resolve(result) : reject(error)
    })
  })

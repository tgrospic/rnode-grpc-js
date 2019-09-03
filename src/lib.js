import * as R from 'ramda'

// Mapping protobuf (simple) types to TypeScript types
export const protoTsTypesMapping = [
  { proto: 'bool'  , ts: 'boolean' },
  { proto: 'string', ts: 'string' },
  { proto: 'int32' , ts: 'number' },
  { proto: 'uint32', ts: 'number' },
  { proto: 'sint32', ts: 'number' },
  { proto: 'int64' , ts: 'number | Long' },
  { proto: 'uint64', ts: 'number | Long' },
  { proto: 'sint64', ts: 'number | Long' },
  { proto: 'float' , ts: 'number' },
  { proto: 'double', ts: 'number' },
  { proto: 'bytes' , ts: 'Uint8Array' },
]

const ignoredNamespaces = [
  ['scalapb'],
  ['google', 'protobuf'],
  ["coop", "rchain", "comm", "protocol", "routing"]
]

// Transform generated (protobufjs) JSON to a flat list of services and types
export const flattenSchema = parentPath => schema => {
  const nestedProps = R.prop('nested', schema)
  const getProps = R.pipe(
    Object.entries,
    R.chain(([name, v]) => {
      const {methods, fields, nested} = v
      const namespace = parentPath
      if (methods)
        return { namespace, type: 'service', name, methods }
      else if (fields) {
        const nullables = R.pipe(
          R.propOr({}, 'oneofs'), Object.values, R.chain(R.prop('oneof'))
        )(v)
        return { namespace, type: 'type', name, fields, nullables }
      }
      else if (nested)
        return R.chain(flattenSchema([...parentPath, name]), [v])
    }),
    R.reject(R.isNil),
    R.reject(({namespace}) => R.contains(namespace, ignoredNamespaces)),
  )
  return getProps(nestedProps || {})
}

export const then = R.curry((f, p) => p.then(f))

export const thenAll = ps => Promise.all(ps)

export const mapAsync = R.curry(async (f, xs) => thenAll(R.map(f, await xs)))

export const chainAsync = R.curry(async (f, xs) => R.flatten(await mapAsync(f, await xs)))

export const filterAsync = R.curry(async (pred, xs) => {
  const predX = async x => ({ p: await pred(x), x })
  const predXs = await mapAsync(predX, await xs)
  return R.pipe(
    R.filter(R.prop('p')),
    mapAsync(R.prop('x')),
  )(predXs)
})

export const waitExit = (proc, result, error) =>
  new Promise((resolve, reject) => {
    proc.on('exit', code => {
      code === 0 ? resolve(result) : reject(error)
    })
  })

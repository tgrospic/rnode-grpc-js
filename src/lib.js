// Mapping protobuf (simple) types to TypeScript types
export const protoTsTypesMapping = [
  { proto: 'bool'  , ts: 'Boolean' },
  { proto: 'string', ts: 'String' },
  { proto: 'int32' , ts: 'Number' },
  { proto: 'sint32', ts: 'Number' },
  { proto: 'int64' , ts: 'Number | Long' },
  { proto: 'sint64', ts: 'Number | Long' },
  { proto: 'float' , ts: 'Number' },
  { proto: 'bytes' , ts: 'Uint8Array' }
]

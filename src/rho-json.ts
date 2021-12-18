/**
  * Converts Par object to JSON returned from RNode gRPC API
  *
  *  new return(`rho:rchain:deployId`) in {
  *    return!("One argument") |   // monadic
  *    return!((true, A, B)) |     // monadic as tuple
  *    return!(true, A, B) |       // polyadic
  *  }
  */
// TODO: make it stack safe
export const rhoParToJson = (input: Par): any => {
  if (!!input.exprsList?.length) {
    const vals = input.exprsList.map(rhoExprToJson)
    return vals.length === 1 ? vals[0] : vals
  } else if (!!input.unforgeablesList?.length) {
    const vals = input.unforgeablesList.map(rhoUnforgeableToJson)
    return vals.length === 1 ? vals[0] : vals
  } else {
    return null
  }
}

const rhoExprToJson = (x: Expr): any => {
  // First check if complex fields can be deserialized
  if (x.eListBody !== void 666) {
    return x.eListBody.psList?.map(rhoParToJson)
  } else if (x.eSetBody !== void 666) {
    return x.eSetBody.psList?.map(rhoParToJson)
  } else if (x.eTupleBody !== void 666) {
    return x.eTupleBody.psList?.map(rhoParToJson)
  } else if (x.eMapBody !== void 666) {
    return x.eMapBody.kvsList?.reduce((acc, { key, value }) => {
      const k = rhoParToJson(key)
      const v = rhoParToJson(value)
      return { ...acc, [k]: v }
    }, {})
  // Only non-default primitives can be deserialized
  } else if (x.gBool !== false) {
    return x.gBool
  } else if (x.gInt !== 0) {
    return x.gInt
  } else if (x.gString !== '') {
    return x.gString
  } else if (x.gUri !== '') {
    return x.gUri
  } else if (x.gByteArray?.length !== 0) {
    return uint8ArrayToHex(x.gByteArray!)
  } else {
    // If no complex object is set and if all primitives are equal to
    // default there is no way to know what field is serialized,
    // so `null` have meaning of default primitive value.
    return null
  }
}

const rhoUnforgeableToJson = (x: GUnforgeable): any => {
  if (x.gDeployIdBody !== void 666) {
    return uint8ArrayToHex(x.gDeployIdBody.sig!)
  } else if (x.gDeployerIdBody !== void 666) {
    return uint8ArrayToHex(x.gDeployerIdBody.publickey!)
  } else if (x.gPrivateBody !== void 666) {
    return uint8ArrayToHex(x.gPrivateBody.id!)
  } else {
    return null
  }
}

const uint8ArrayToHex = (x: Uint8Array) =>
  Buffer.from(x).toString('hex')

/**
  * Types copied from generated JS code from protobuf
  * - depends on specific version of specific RNode version but not changed often
  */

export interface Par {
  readonly exprsList?: Expr[]
  readonly unforgeablesList?: GUnforgeable[]
}

export interface Expr {
  // Primitive types
  // NOTE: Protobuf 3 doesn't serialize default values, so no way
  //       to check which field contains the value if set to default!
  // https://github.com/rchain/rchain/issues/3566
  readonly gBool?: boolean
  readonly gInt?: number
  readonly gString?: string
  readonly gUri?: string
  readonly gByteArray?: Uint8Array
  // Complex types
  readonly eListBody?: EList
  readonly eTupleBody?: ETuple
  readonly eSetBody?: ESet
  readonly eMapBody?: EMap
}

export interface EList {
  readonly psList?: Par[]
}

export interface ETuple {
  readonly psList?: Par[]
}

export interface ESet {
  readonly psList?: Par[]
}

export interface EMap {
  readonly kvsList?: KeyValuePair[]
}

export interface KeyValuePair {
  readonly key: Par
  readonly value: Par
}

export interface GUnforgeable {
  readonly gPrivateBody?: GPrivate
  readonly gDeployIdBody?: GDeployId
  readonly gDeployerIdBody?: GDeployerId
}

export interface GPrivate {
  readonly id?: Uint8Array
}

export interface GDeployId {
  readonly sig?: Uint8Array
}

export interface GDeployerId {
  readonly publickey?: Uint8Array
}

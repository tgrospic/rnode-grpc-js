/**
  * Converts `Par` object to JSON returned from the RNode gRPC API.
  *
  * Example of Rholang return values.
  * ```scala
  * new return(`rho:rchain:deployId`) in {
  *   return!("One argument") |    // monadic
  *   return!((true, "A", "B")) |  // monadic as tuple
  *   return!(true, "A", "B") |    // polyadic
  *   return!(true) | return!("A") // multiple values
  * }
  * ```
  * And the corresponding converted JSON objects.
  *
  * ```js
  * [ 'One argument' ]       // return!("One argument")
  * [ [ true, 'A', 'B' ] ]   // return!((true, "A", "B"))
  * [ true, 'A', 'B' ]       // return!(true, "A", "B")
  * [ true, 'A' ]            // return!(true) | return!("A")
  * ```
  */
// TODO: make it stack safe
export const rhoParToJson = (input: Par): any => {
  if (input === void 666 || input === null) return input

  if (!!input.exprsList?.length) {
    const vals = input.exprsList.map(rhoExprToJson)
    return vals.length === 1 ? vals[0] : vals
  } else if (!!input.unforgeablesList?.length) {
    const vals = input.unforgeablesList.map(rhoUnforgeableToJson)
    return vals.length === 1 ? vals[0] : vals
  } else {
    // For all other types of fields return undefined
    // (not obvious representation in JSON)
    return void 666
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
      // Get key from Par
      const kRaw = rhoParToJson(key)
      // Convert binary key to hex string
      const k = kRaw instanceof Uint8Array ? uint8ArrayToHex(kRaw) : kRaw
      // Get value from Par
      const v = rhoParToJson(value)
      // Skip key if undefined (not obvious representation in JSON)
      return k === void 666 || k === null ? acc : { ...acc, [k]: v }
    }, {})
  // Only non-default primitives can be deserialized
  } else if (x.gBool !== void 666) {
    return x.gBool
  } else if (x.gInt !== void 666) {
    return x.gInt
  } else if (x.gString !== void 666) {
    return x.gString
  } else if (x.gUri !== void 666) {
    return x.gUri
  } else if (x.gByteArray !== void 666) {
    return base64ToUint8Array(x.gByteArray! as any)
  } else {
    // For all other types of fields return undefined
    // (not obvious representation in JSON)
    return void 666
  }
}

const rhoUnforgeableToJson = (x: GUnforgeable): any => {
  if (x.gDeployIdBody !== void 666) {
    return base64ToUint8Array(x.gDeployIdBody.sig! as any)
  } else if (x.gDeployerIdBody !== void 666) {
    return base64ToUint8Array(x.gDeployerIdBody.publickey! as any)
  } else if (x.gPrivateBody !== void 666) {
    return base64ToUint8Array(x.gPrivateBody.id! as any)
  }
}

const uint8ArrayToHex = (x: Uint8Array) =>
  Buffer.from(x).toString('hex')

const base64ToUint8Array = (x: string) =>
  Uint8Array.from(Buffer.from(x, 'base64'))

/**
  * Types copied from generated JS code from protobuf
  * - depends on specific version of specific RNode version but not changed often
  */

export interface Par {
  readonly exprsList?: Expr[]
  readonly unforgeablesList?: GUnforgeable[]
}

export interface Expr {
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

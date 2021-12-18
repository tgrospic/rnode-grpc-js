import { blake2bHex } from 'blakejs'
import { ec } from 'elliptic'
import jspb from 'google-protobuf'

/**
 * These deploy types are based on protobuf specification which must be
 * used to create the hash and signature of deploy data.
 */

/**
 * Deploy data (required for signing)
 */
export interface UnsignedDeployData {
  readonly term: string
  readonly timestamp: number
  readonly phlolimit: number
  readonly phloprice: number
  readonly validafterblocknumber: number
}

/**
 * Signed DeployData object (protobuf specification)
 * NOTE: Represents the same type as generated DeployData.
 */
export interface DeploySignedProto {
  readonly term: string
  readonly timestamp: number
  readonly phlolimit: number
  readonly phloprice: number
  readonly validafterblocknumber: number
  readonly sigalgorithm: string
  readonly deployer: Uint8Array
  readonly sig: Uint8Array
}

/**
  * Signs deploy data.
  *
  * The private key for signing can be in different formats supported by
  * [elliptic](https://github.com/indutny/elliptic#ecdsa) library.
  *
  * **NOTE: Signing function can be used independently without this library and JS generated code (see _rnode-sign.ts_ source).**
  *
  * ```typescript
  * // Generate new key pair
  * const { ec } = require('elliptic')
  * const secp256k1 = new ec('secp256k1')
  * const key = secp256k1.genKeyPair()
  *
  * // Or use existing private key as hex string, Uint8Array, Buffer or ec.KeyPair
  * const key = '1bf36a3d89c27ddef7955684b97667c75454317d8964528e57b2308947b250b0'
  *
  * const deployData = {
  *   term: 'new out(`rho:io:stdout`) in { out!("Browser deploy test") }',
  *   timestamp: Date.now(),      // nonce
  *   phloprice: 1,               // price of tinny REV for phlogiston (gas)
  *   phlolimit: 10e3,            // max phlogiston (gas) for deploy execution
  *   validafterblocknumber: 123, // latest block number
  * }
  *
  * // Signed deploy with deployer, sig and sigalgorithm fields populated
  * const signed = signDeploy(key, deployData)
  * ```
  */
export const signDeploy = function (privateKey: ec.KeyPair | string, deployObj: UnsignedDeployData): DeploySignedProto {
  const {
    term, timestamp, phlolimit, phloprice, validafterblocknumber,
  } = deployObj

  // Currently supported algorithm
  const sigalgorithm = 'secp256k1'

  // Serialize deploy data for signing
  const deploySerialized = deployDataProtobufSerialize({
    term, timestamp, phlolimit, phloprice, validafterblocknumber,
  })

  // Signing key
  const crypt    = new ec(sigalgorithm)
  const key      = getSignKey(crypt, privateKey)
  const deployer = Uint8Array.from(key.getPublic('array'))
  // Hash and sign serialized deploy
  const hashed   = blake2bHex(deploySerialized, void 666, 32)
  const sigArray = key.sign(hashed, {canonical: true}).toDER()
  const sig      = Uint8Array.from(sigArray)

  // Return deploy object / ready for sending to RNode
  return {
    term, timestamp, phlolimit, phloprice, validafterblocknumber,
    sigalgorithm, deployer, sig,
  }
}

/**
  * Verifies deploy for a valid signature.
  */
export const verifyDeploy = (deployObj: DeploySignedProto) => {
  const {
    term, timestamp, phlolimit, phloprice, validafterblocknumber,
    sigalgorithm, deployer, sig,
  } = deployObj

  // Serialize deploy data for signing
  const deploySerialized = deployDataProtobufSerialize({
    term, timestamp, phlolimit, phloprice, validafterblocknumber,
  })

  // Signing public key to verify
  const crypt   = new ec(sigalgorithm)
  const key     = crypt.keyFromPublic(deployer)
  // Hash and verify signature
  const hashed  = blake2bHex(deploySerialized, void 666, 32)
  const isValid = key.verify(hashed, sig)

  return isValid
}

/**
 * Serialization of DeployDataProto object without generated JS code.
 */
export const deployDataProtobufSerialize = (deployData: UnsignedDeployData) => {
  const {term, timestamp, phlolimit, phloprice, validafterblocknumber, } = deployData

  // Create binary stream writer
  const writer = new jspb.BinaryWriter()
  // Write fields (protobuf doesn't serialize default values)
  const writeString = (order: number, val: string) => val != "" && writer.writeString(order, val)
  const writeInt64  = (order: number, val: number) => val != 0  && writer.writeInt64(order, val)

  // https://github.com/rchain/rchain/blob/f7e46a9/models/src/main/protobuf/CasperMessage.proto#L134-L143
  // message DeployDataProto {
  //   bytes  deployer     = 1; //public key
  //   string term         = 2; //rholang source code to deploy (will be parsed into `Par`)
  //   int64  timestamp    = 3; //millisecond timestamp
  //   bytes  sig          = 4; //signature of (hash(term) + timestamp) using private key
  //   string sigAlgorithm = 5; //name of the algorithm used to sign
  //   int64 phloPrice     = 7; //phlo price
  //   int64 phloLimit     = 8; //phlo limit for the deployment
  //   int64 validAfterBlockNumber = 10;
  // }

  // Serialize fields
  writeString(2, term)
  writeInt64(3, timestamp)
  writeInt64(7, phloprice)
  writeInt64(8, phlolimit)
  writeInt64(10, validafterblocknumber)

  return writer.getResultBuffer()
}

/**
 * Fix for ec.keyFromPrivate not accepting KeyPair.
 * - detect KeyPair if it have `sign` function
 */
const getSignKey = (crypt: ec, pk: ec.KeyPair | string) =>
  pk && typeof pk != 'string' && pk.sign && pk.sign.constructor == Function ? pk : crypt.keyFromPrivate(pk)

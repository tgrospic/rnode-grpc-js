declare module "@tgrospic/rnode-grpc-js" {
  import { ec } from 'elliptic'

  interface Options {
    // Client created with:
    // - `@grpc/grpc-js` (class Client)
    // - `grpc-web` (class GrpcWebClientBase)
    client: any
    // RNode url
    host?: string
    // Generated JSON schema
    protoSchema: Object
  }

  /**
   * Example how to instantiate RNode client generated with **rnode-grpc-js** tool.
   * ```typescript
   * const grpc = require('@grpc/grpc-js') // Nodejs client
   * const grpcWeb = require('grpc-web') // Web client
   *
   * // JSON schema of proto definitions (generated also with rnode-grpc-js tool)
   * const protoSchema = require('../rnode-grpc-gen/js/pbjs_generated.json')
   * // Import generated protobuf types (in global scope)
   * require('../../rnode-grpc-gen/js/DeployServiceV1_pb')
   * require('../../rnode-grpc-gen/js/ProposeServiceV1_pb')
   *
   * const options = {
   *  protoSchema,
   *  // Nodejs client
   *  client: new grpc.Client('node0.testnet.rchain-dev.tk:40401', grpc.credentials.createInsecure()),
   *  // Web client
   *  host: 'https://testnet-0.grpc.rchain.isotypic.com',
   *  client: new grpcWeb.GrpcWebClientBase({format: 'binary'}),
   * }
   *
   * // Instantiate client Deploy service
   * const { getBlocks, listenForDataAtName, DoDeploy } = rnodeDeploy(options)
   *
   * // Call remote function
   * const blocks = await getBlocks({ depth: 2 })
   * ```
   */
  export function rnodeDeploy(opt: Options): DeployService

  /**
   * Example how to instantiate RNode client generated with **rnode-grpc-js** tool.
   * ```typescript
   * const grpc = require('@grpc/grpc-js') // Nodejs client
   * const grpcWeb = require('grpc-web') // Web client
   *
   * // JSON schema of proto definitions (generated also with rnode-grpc-js tool)
   * const protoSchema = require('../rnode-grpc-gen/js/pbjs_generated.json')
   * // Import generated protobuf types (in global scope)
   * require('../../rnode-grpc-gen/js/DeployServiceV1_pb')
   * require('../../rnode-grpc-gen/js/ProposeServiceV1_pb')
   *
   * const options = {
   *  protoSchema,
   *  // Nodejs client
   *  client: new grpc.Client('node0.testnet.rchain-dev.tk:40401', grpc.credentials.createInsecure()),
   *  // Web client
   *  host: 'https://testnet-0.grpc.rchain.isotypic.com',
   *  client: new grpcWeb.GrpcWebClientBase({format: 'binary'}),
   * }
   *
   * // Instantiate client Propose service
   * const { propose } = rnodePropose(options)
   *
   * // Call remote function
   * const { result } = await propose()
   * ```
   */
  export function rnodePropose(opt: Options): ProposeService

  /**
   * Example how to instantiate RNode client generated with **rnode-grpc-js** tool.
   * ```typescript
   * const grpc = require('@grpc/grpc-js') // Nodejs client
   *
   * // JSON schema of proto definitions (generated also with rnode-grpc-js tool)
   * const protoSchema = require('../rnode-grpc-gen/js/pbjs_generated.json')
   * // Import generated protobuf types (in global scope)
   * require('../../rnode-grpc-gen/js/repl_pb')
   *
   * const options = {
   *  protoSchema,
   *  // Nodejs client
   *  client: new grpc.Client('node0.testnet.rchain-dev.tk:40402', grpc.credentials.createInsecure()),
   * }
   *
   * // Instantiate client Repl service
   * const { Eval, Run } = rnodeRepl(options)
   *
   * // Call remote function
   * const evalResult = await Eval({ program: 'new a in { *a }' })
   * ```
   */
  export function rnodeRepl(opt: Options): Repl

  /**
   * Example how to instantiate RNode client generated with **rnode-grpc-js** tool.
   * ```typescript
   * const grpc = require('@grpc/grpc-js') // Nodejs client
   * const grpcWeb = require('grpc-web') // Web client
   *
   * // JSON schema of proto definitions (generated also with rnode-grpc-js tool)
   * const protoSchema = require('../rnode-grpc-gen/js/pbjs_generated.json')
   * // Import generated protobuf types (in global scope)
   * require('../../rnode-grpc-gen/js/DeployServiceV1_pb')
   * require('../../rnode-grpc-gen/js/ProposeServiceV1_pb')
   *
   * const options = {
   *  protoSchema,
   *  // Nodejs client
   *  client: new grpc.Client('node0.testnet.rchain-dev.tk:40401', grpc.credentials.createInsecure()),
   *  // Web client
   *  host: 'https://testnet-0.grpc.rchain.isotypic.com',
   *  client: new grpcWeb.GrpcWebClientBase({format: 'binary'}),
   * }
   *
   * // Deploy service example
   * const { getBlocks, listenForDataAtName, DoDeploy } = rnodeService(options)
   *
   * // Propose service example
   * const { propose } = rnodeService(options)
   * ```
   */
  export function rnodeService(opt: Options): DeployService | ProposeService | Repl

  /**
   * The private key for signing can be in different formats supported by
   * [elliptic](https://github.com/indutny/elliptic#ecdsa) library.
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
   *   phloLimit: 10e3,
   * }
   *
   * // Signed deploy with deployer, sig and sigAlgorithm fields populated
   * const signed = signDeploy(key, deployData)
   * ```
   */
  export function signDeploy(key: string | Uint8Array | Buffer | ec.KeyPair, deploy: UnsignedDeployData): DeployDataProto

  /**
   * Verifies deploy for a valid signature.
   */
  export function verifyDeploy(deploy: DeployDataProto): Boolean

  /**
   * Protobuf serialize / deserialize operations.
   */
  export function rnodeProtobuf({protoSchema}: {protoSchema: Object}): TypesBinary

  /*__SERVICES__*/

  interface Unit {}

  // TODO: add support to generate nested types
  interface WildcardMsg {}

  interface UnsignedDeployData {
    term: String
    timestamp?: Number | Long
    phlolimit: Number | Long
    phloprice?: Number | Long
    validafterblocknumber?: Number | Long
  }

  /*__TYPES__*/

  // Protobuf binary serializer
  interface BinaryOp<T> {
    /**
     * Serializes plain JS object with `google-protobuf` serializer.
     */
    serialize(_: T): Uint8Array
    /**
     * Deserializes bytes to plain JS object with `google-protobuf` deserializer.
     */
    deserialize(_: Uint8Array): T
    /**
     * Creates underlying message object generated by `protoc`.
     * https://github.com/protocolbuffers/protobuf/tree/master/js#api
     */
    create(opt_data: any[]): any
  }

  // Binary operations (serialize / deserialize) for all types
  // - serialize / deserialize functions exposed from generated JS objects
  interface TypesBinary {
    /*__TYPES_BINARY__*/
  }
}

declare module "@tgrospic/rnode-grpc-js" {
  import { ec } from 'elliptic'

  /**
   * Example how to instantiate RNode client generated with **rnode-grpc-js** tool.
   * ```typescript
   * // Generated browser client
   * const { DeployServiceClient } = require('../../rnode-grpc-gen/js/DeployService_grpc_web_pb')
   * // Service instance / endpoint
   * const deployClient = new DeployServiceClient('https://testnet-0.grpc.rchain.isotypic.com')
   *
   * // Generated Nodejs client
   * const grpc = require('grpc')
   * const { DeployServiceClient, ProposeServiceClient } = require('../../rnode-grpc-gen/js/DeployService_grpc_pb')
   * const deployClient = new DeployServiceClient('node0.testnet.rchain-dev.tk:40401', grpc.credentials.createInsecure())
   *
   * // JSON schema of proto definitions (generated also with rnode-grpc-js tool)
   * const protoSchema = require('../../rnode-grpc-gen/js/pbjs_generated.json')
   *
   * // Instantiate client Deploy service
   * const { getBlocks, listenForDataAtName, DoDeploy } = rnodeDeploy(deployService, { protoSchema })
   *
   * // Call remote function
   * const blocks = await getBlocks({ depth: 2 })
   * ```
   */
  export function rnodeDeploy(deployClient, { protoSchema }): DeployService

  /**
   * Example how to instantiate RNode client generated with **rnode-grpc-js** tool.
   * ```typescript
   * // Generated browser client
   * const { ProposeServiceClient } = require('../../rnode-grpc-gen/js/ProposeService_grpc_pb')
   * // Client instance / endpoint
   * const proposeClient = new ProposeServiceClient('https://testnet-0.grpc.rchain.isotypic.com')
   *
   * // Generated Nodejs client
   * const grpc = require('grpc')
   * const { ProposeServiceClient } = require('../../rnode-grpc-gen/js/DeployService_grpc_pb')
   * // Service instance / endpoint
   * const proposeClient = new ProposeServiceClient('node0.testnet.rchain-dev.tk:40401', grpc.credentials.createInsecure())
   *
   * // JSON schema of proto definitions (generated also with rnode-grpc-js tool)
   * const protoSchema = require('../../rnode-grpc-gen/js/pbjs_generated.json')
   *
   * // Instantiate client Propose service
   * const { propose } = rnodePropose(proposeClient, { protoSchema })
   *
   * // Call remote function
   * await propose()
   * ```
   */
  export function rnodePropose(proposeService, { protoSchema }): ProposeService

  /**
   * Example how to instantiate RNode client generated with **rnode-grpc-js** tool.
   * ```typescript
   * // Generated Nodejs client
   * const grpc = require('grpc')
   * const { ReplClient } = require('../../rnode-grpc-gen/js/repl_grpc_pb')
   * // Client instance / endpoint
   * const replClient = new ReplClient('localhost:40402', grpc.credentials.createInsecure())
   *
   * // JSON schema of proto definitions (generated also with rnode-grpc-js tool)
   * const protoSchema = require('../../rnode-grpc-gen/js/pbjs_generated.json')
   *
   * // Instantiate client Repl service
   * const { Eval, Run } = rnodeRepl(replClient, { protoSchema })
   *
   * // Call remote function
   * const evalResult = await Eval({ program: 'new a in { *a }' })
   * ```
   */
  export function rnodeRepl(replClient, { protoSchema }): Repl

  /**
   * Example how to instantiate RNode client generated with **rnode-grpc-js** tool.
   * ```typescript
   * // Generated browser clients
   * const { DeployServiceClient } = require('../../rnode-grpc-gen/js/DeployService_grpc_web_pb')
   * const { ProposeServiceClient } = require('../../rnode-grpc-gen/js/ProposeService_grpc_web_pb')
   * // Client instances / endpoints
   * const deployClient = new DeployServiceClient('https://testnet-0.grpc.rchain.isotypic.com')
   * const proposeClient = new ProposeServiceClient('https://testnet-0.grpc.rchain.isotypic.com')
   *
   * // JSON schema of proto definitions (generated also with rnode-grpc-js tool)
   * const protoSchema = require('../../rnode-grpc-gen/js/pbjs_generated.json')
   *
   * // Deploy service example
   * const { getBlocks, listenForDataAtName, DoDeploy } = rnodeService(deployClient, { protoSchema })
   *
   * // Propose service example
   * const { propose } = rnodeService(proposeClient, { protoSchema })
   * ```
   */
  export function rnodeService(genServiceClient, { protoSchema }): DeployService | ProposeService | Repl

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
  export function signDeploy(key: string | Uint8Array | Buffer | ec.KeyPair, deploy: UnsignedDeployData): DeployData

  /**
   * Verifies deploy for a valid signature.
   */
  export function verifyDeploy(deploy: DeployData): Boolean

  /**
   * Protobuf serialize / deserialize operations.
   */
  export function rnodeProtobuf(protoSchema): TypesBinary

  /*__SERVICES__*/

  interface Unit {}

  // TODO: add support to generate nested types
  interface WildcardMsg {}

  interface UnsignedDeployData {
    term: String
    timestamp: Number | Long
    phloLimit: Number | Long
    phloPrice?: Number | Long
    validAfterBlockNumber?: Number | Long
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
    /*_TYPES_BINARY_*/
  }
}

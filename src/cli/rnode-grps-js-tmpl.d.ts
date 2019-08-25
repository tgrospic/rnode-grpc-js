declare module "@tgrospic/rnode-grpc-js" {
  import { ec } from 'elliptic'

  /**
   * Example how to instantiate RNode client generated with **rnode-grpc-js** tool.
   * ```typescript
   * // Generated browser client
   * const { DeployServiceClient } = require('../../rnode-grpc-gen/js/DeployService_grpc_web_pb')
   * // Service instance / endpoint
   * const deployService = new DeployServiceClient('https://testnet-0.grpc.rchain.isotypic.com')
   *
   * // Generated Nodejs client
   * const grpc = require('grpc')
   * const { DeployServiceClient, ProposeServiceClient } = require('../../rnode-grpc-gen/js/DeployService_grpc_pb')
   * const deployService = new DeployServiceClient('node0.testnet.rchain-dev.tk:40401', grpc.credentials.createInsecure())
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
  export function rnodeDeploy(deployService, { protoSchema }): DeployService

  /**
   * Example how to instantiate RNode client generated with **rnode-grpc-js** tool.
   * ```typescript
   * // Generated browser client
   * const { ProposeServiceClient } = require('../../rnode-grpc-gen/js/ProposeService_grpc_pb')
   * // Service instance / endpoint
   * const proposeService = new ProposeServiceClient('https://testnet-0.grpc.rchain.isotypic.com')
   *
   * // Generated Nodejs client
   * const grpc = require('grpc')
   * const { ProposeServiceClient } = require('../../rnode-grpc-gen/js/DeployService_grpc_pb')
   * // Service instance / endpoint
   * const proposeService = new ProposeServiceClient('node0.testnet.rchain-dev.tk:40401', grpc.credentials.createInsecure())
   *
   * // JSON schema of proto definitions (generated also with rnode-grpc-js tool)
   * const protoSchema = require('../../rnode-grpc-gen/js/pbjs_generated.json')
   *
   * // Instantiate client Propose service
   * const { propose } = rnodePropose(proposeService, { protoSchema })
   *
   * // Call remote function
   * await propose()
   * ```
   */
  export function rnodePropose(proposeService, { protoSchema }): ProposeService

  /**
   * Example how to instantiate RNode client generated with **rnode-grpc-js** tool.
   * ```typescript
   * // Generated browser clients
   * const { DeployServiceClient } = require('../../rnode-grpc-gen/js/DeployService_grpc_web_pb')
   * const { ProposeServiceClient } = require('../../rnode-grpc-gen/js/ProposeService_grpc_web_pb')
   * // Service instances / endpoints
   * const deployService = new DeployServiceClient('https://testnet-0.grpc.rchain.isotypic.com')
   * const proposeService = new ProposeServiceClient('https://testnet-0.grpc.rchain.isotypic.com')
   *
   * // JSON schema of proto definitions (generated also with rnode-grpc-js tool)
   * const protoSchema = require('../../rnode-grpc-gen/js/pbjs_generated.json')
   *
   * // Deploy service example
   * const { getBlocks, listenForDataAtName, DoDeploy } = rnodeService(deployService, { protoSchema })
   *
   * // Propose service example
   * const { propose } = rnodeService(proposeService, { protoSchema })
   * ```
   */
  export function rnodeService(service, { protoSchema }): DeployService | ProposeService

  /**
   * For now `signDeploy` accepts `KeyPair` provided from [elliptic](https://github.com/indutny/elliptic#ecdsa) library.
   * ```typescript
   * const { ec } = require('elliptic')
   * const secp256k1 = new ec('secp256k1')
   *
   * const key = secp256k1.genKeyPair()
   * const deployData = {
   *   term: 'new out(`rho:io:stdout`) in { out!("Browser deploy test") }',
   *   phloLimit: 10e3,
   * }
   *
   * // Signed deploy with deployer, sig and sigAlgorithm fileds populated
   * const signed = signDeploy(key, deployData)
   * ```
   */
  export function signDeploy(key: ec.KeyPair, deploy: UnsignedDeployData): DeployData

  interface UnsignedDeployData {
    term: String
    timestamp: Number | Long
    phloLimit: Number | Long
    phloPrice?: Number | Long
    validAfterBlockNumber?: Number | Long
  }

  interface Unit {}

  // TODO: add support to generate nested types
  interface WildcardMsg {}

  /*__SERVICES__*/

  /*__TYPES__*/
}

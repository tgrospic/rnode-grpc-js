import { Options, WildcardMsg, BinaryOp } from "@tgrospic/rnode-grpc-js"

/**
 * Generated TypeScript definitions for RNode __RNODE_VERSION__.
 */
declare module "@tgrospic/rnode-grpc-js" {

  /**
   * Example how to instantiate RNode client generated with **rnode-grpc-js** tool.
   *
   * ```typescript
   * // Import generated protobuf types (in global scope)
   * require('../../rnode-grpc-gen/js/DeployServiceV1_pb')
   * require('../../rnode-grpc-gen/js/ProposeServiceV1_pb')
   *
   * const options = {
   *   // JSON schema of proto definitions (generated also with rnode-grpc-js tool)
   *   protoSchema: require('../../rnode-grpc-gen/js/pbjs_generated.json'),
   *   // Nodejs client
   *   grpcLib: require('@grpc/grpc-js'),
   *   host: 'localhost:40401',
   *   // Web client
   *   grpcLib: require('grpc-web'),
   *   host: 'https://<grpc-web-host>:<port>',
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
   *
   * ```typescript
   * // Import generated protobuf types (in global scope)
   * require('../../rnode-grpc-gen/js/DeployServiceV1_pb')
   * require('../../rnode-grpc-gen/js/ProposeServiceV1_pb')
   *
   * const options = {
   *   // JSON schema of proto definitions (generated also with rnode-grpc-js tool)
   *   protoSchema: require('../../rnode-grpc-gen/js/pbjs_generated.json'),
   *   // Nodejs client
   *   grpcLib: require('@grpc/grpc-js'),
   *   host: 'localhost:40402',
   *   // Web client
   *   grpcLib: require('grpc-web'),
   *   host: 'https://<grpc-web-host>:<port>',
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
   *
   * ```typescript
   * // Import generated protobuf types (in global scope)
   * require('../../rnode-grpc-gen/js/repl_pb')
   *
   * const options = {
   *   // JSON schema of proto definitions (generated also with rnode-grpc-js tool)
   *   protoSchema: require('../../rnode-grpc-gen/js/pbjs_generated.json'),
   *   // Nodejs client
   *   grpcLib: require('@grpc/grpc-js'),
   *   host: 'localhost:40402',
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
   *
   * ```typescript
   * // Import generated protobuf types (in global scope)
   * require('../../rnode-grpc-gen/js/DeployServiceV1_pb')
   * require('../../rnode-grpc-gen/js/ProposeServiceV1_pb')
   *
   * const options = {
   *   // JSON schema of proto definitions (generated also with rnode-grpc-js tool)
   *   protoSchema: require('../../rnode-grpc-gen/js/pbjs_generated.json'),
   *   // Nodejs client
   *   grpcLib: require('@grpc/grpc-js'),
   *   host: 'localhost:40401',
   *   // Web client
   *   grpcLib: require('grpc-web'),
   *   host: 'https://<grpc-web-host>:<port>',
   * }
   *
   * // Remote methods
   * const { DoDeploy, propose, Eval } = rnodeService(options)
   * ```
   */
  export function rnodeService(opt: Options): DeployService & ProposeService & Repl

  /**
   * Protobuf serialize / deserialize operations.
   */
  export function rnodeProtobuf({protoSchema}: {protoSchema: Object}): TypesBinary

  /*__SERVICES__*/

  /*__TYPES__*/

  // Binary operations (serialize / deserialize) for all types
  // - serialize / deserialize functions exposed from generated JS objects
  interface TypesBinary {
    /*__TYPES_BINARY__*/
  }
}

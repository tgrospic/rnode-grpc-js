import { ec } from 'elliptic'
import * as _ from "@tgrospic/rnode-grpc-js"

/**
 * Generated TypeScript definitions for RNode v0.12.4
 */
declare module "@tgrospic/rnode-grpc-js" {

  interface Options {
    // gRPC protocol implementation
    // - `@grpc/grpc-js` for Nodejs
    // - `grpc-web` for browser
    grpcLib: any
    // Custom options for gRPC clients
    // grpc-web: https://github.com/grpc/grpc-web/blob/8b501a96f/javascript/net/grpc/web/grpcwebclientbase.js#L45
    // grpc    : https://github.com/grpc/grpc-node/blob/b05caec/packages/grpc-js/src/client.ts#L67
    // - `credentials` can be supplied as part of `clientOptions` for `grpc-js`
    clientOptions?: any,
    // RNode host (method prefix)
    host: string,
    // Generated JSON schema
    protoSchema: Object
  }

  /**
   * Example how to instantiate RNode client generated with **rnode-grpc-js** tool.
   * ```typescript
   * // Import generated protobuf types (in global scope)
   * require('../../rnode-grpc-gen/js/DeployServiceV1_pb')
   * require('../../rnode-grpc-gen/js/ProposeServiceV1_pb')
   *
   * const options = {
   *   // JSON schema of proto definitions (generated also with rnode-grpc-js tool)
   *   protoSchema: require('../rnode-grpc-gen/js/pbjs_generated.json'),
   *   // Nodejs client
   *   grpcLib: require('@grpc/grpc-js'),
   *   host: 'node0.testnet.rchain-dev.tk:40401',
   *   // Web client
   *   grpcLib: require('grpc-web'),
   *   host: 'https://testnet-0.grpc.rchain.isotypic.com',
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
   * // Import generated protobuf types (in global scope)
   * require('../../rnode-grpc-gen/js/DeployServiceV1_pb')
   * require('../../rnode-grpc-gen/js/ProposeServiceV1_pb')
   *
   * const options = {
   *   // JSON schema of proto definitions (generated also with rnode-grpc-js tool)
   *   protoSchema: require('../rnode-grpc-gen/js/pbjs_generated.json'),
   *   // Nodejs client
   *   grpcLib: require('@grpc/grpc-js'),
   *   host: 'node0.testnet.rchain-dev.tk:40401',
   *   // Web client
   *   grpcLib: require('grpc-web'),
   *   host: 'https://testnet-0.grpc.rchain.isotypic.com',
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
   * // Import generated protobuf types (in global scope)
   * require('../../rnode-grpc-gen/js/repl_pb')
   *
   * const options = {
   *   // JSON schema of proto definitions (generated also with rnode-grpc-js tool)
   *   protoSchema: require('../rnode-grpc-gen/js/pbjs_generated.json'),
   *   // Nodejs client
   *   grpcLib: require('@grpc/grpc-js'),
   *   host: 'node0.testnet.rchain-dev.tk:40402',
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
   * // Import generated protobuf types (in global scope)
   * require('../../rnode-grpc-gen/js/DeployServiceV1_pb')
   * require('../../rnode-grpc-gen/js/ProposeServiceV1_pb')
   *
   * const options = {
   *   // JSON schema of proto definitions (generated also with rnode-grpc-js tool)
   *   protoSchema: require('../rnode-grpc-gen/js/pbjs_generated.json'),
   *   // Nodejs client
   *   grpcLib: require('@grpc/grpc-js'),
   *   host: 'node0.testnet.rchain-dev.tk:40401',
   *   // Web client
   *   grpcLib: require('grpc-web'),
   *   host: 'https://testnet-0.grpc.rchain.isotypic.com',
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

  interface DeployService {
    doDeploy(_?: DeployDataProto): Promise<DeployResponse>
    getBlock(_?: BlockQuery): Promise<BlockResponse>
    visualizeDag(_?: VisualizeDagQuery): Promise<VisualizeBlocksResponse[]>
    machineVerifiableDag(_?: MachineVerifyQuery): Promise<MachineVerifyResponse>
    showMainChain(_?: BlocksQuery): Promise<BlockInfoResponse[]>
    getBlocks(_?: BlocksQuery): Promise<BlockInfoResponse[]>
    listenForDataAtName(_: DataAtNameQuery): Promise<ListeningNameDataResponse>
    listenForContinuationAtName(_: ContinuationAtNameQuery): Promise<ContinuationAtNameResponse>
    findDeploy(_?: FindDeployQuery): Promise<FindDeployResponse>
    previewPrivateNames(_?: PrivateNamePreviewQuery): Promise<PrivateNamePreviewResponse>
    lastFinalizedBlock(_?: LastFinalizedBlockQuery): Promise<LastFinalizedBlockResponse>
    isFinalized(_?: IsFinalizedQuery): Promise<IsFinalizedResponse>
    bondStatus(_?: BondStatusQuery): Promise<BondStatusResponse>
    exploratoryDeploy(_?: ExploratoryDeployQuery): Promise<ExploratoryDeployResponse>
    getBlocksByHeights(_?: BlocksQueryByHeight): Promise<BlockInfoResponse[]>
    getEventByHash(_?: ReportQuery): Promise<EventInfoResponse>
  }

  interface ProposeService {
    propose(_?: ProposeQuery): Promise<ProposeResponse>
    proposeResult(_?: ProposeResultQuery): Promise<ProposeResultResponse>
  }

  interface Repl {
    Run(_?: CmdRequest): Promise<ReplResponse>
    Eval(_?: EvalRequest): Promise<ReplResponse>
  }

  interface Unit {}

  // TODO: add support to generate nested types
  interface WildcardMsg {}

  interface HasBlockRequestProto {
    readonly hash?: Uint8Array /* bytes */
  }

  interface HasBlockProto {
    readonly hash?: Uint8Array /* bytes */
  }

  interface BlockRequestProto {
    readonly hash?: Uint8Array /* bytes */
  }

  interface ForkChoiceTipRequestProto {
    
  }

  interface ApprovedBlockCandidateProto {
    readonly block: BlockMessageProto
    readonly requiredsigs?: number /* int32 */
  }

  interface UnapprovedBlockProto {
    readonly candidate: ApprovedBlockCandidateProto
    readonly timestamp?: number /* int64 */
    readonly duration?: number /* int64 */
  }

  interface Signature {
    readonly publickey?: Uint8Array /* bytes */
    readonly algorithm?: string
    readonly sig?: Uint8Array /* bytes */
  }

  interface BlockApprovalProto {
    readonly candidate: ApprovedBlockCandidateProto
    readonly sig: Signature
  }

  interface ApprovedBlockProto {
    readonly candidate: ApprovedBlockCandidateProto
    readonly sigsList?: Signature[]
  }

  interface ApprovedBlockRequestProto {
    readonly identifier?: string
    readonly trimstate?: boolean /* bool */
  }

  interface NoApprovedBlockAvailableProto {
    readonly identifier?: string
    readonly nodeidentifer?: string
  }

  interface BlockMessageProto {
    readonly blockhash?: Uint8Array /* bytes */
    readonly header: HeaderProto
    readonly body: BodyProto
    readonly justificationsList?: JustificationProto[]
    readonly sender?: Uint8Array /* bytes */
    readonly seqnum?: number /* int32 */
    readonly sig?: Uint8Array /* bytes */
    readonly sigalgorithm?: string
    readonly shardid?: string
    readonly extrabytes?: Uint8Array /* bytes */
  }

  interface BlockHashMessageProto {
    readonly hash?: Uint8Array /* bytes */
    readonly blockcreator?: Uint8Array /* bytes */
  }

  interface BlockMetadataInternal {
    readonly blockhash?: Uint8Array /* bytes */
    readonly parentsList?: Uint8Array[] /* bytes */
    readonly sender?: Uint8Array /* bytes */
    readonly justificationsList?: JustificationProto[]
    readonly bondsList?: BondProto[]
    readonly blocknum?: number /* int64 */
    readonly seqnum?: number /* int32 */
    readonly invalid?: boolean /* bool */
    readonly directlyfinalized?: boolean /* bool */
    readonly finalized?: boolean /* bool */
  }

  interface HeaderProto {
    readonly parentshashlistList?: Uint8Array[] /* bytes */
    readonly timestamp?: number /* int64 */
    readonly version?: number /* int64 */
    readonly extrabytes?: Uint8Array /* bytes */
  }

  interface DeployDataProto {
    readonly deployer?: Uint8Array /* bytes */
    readonly term?: string
    readonly timestamp?: number /* int64 */
    readonly sig?: Uint8Array /* bytes */
    readonly sigalgorithm?: string
    readonly phloprice?: number /* int64 */
    readonly phlolimit?: number /* int64 */
    readonly validafterblocknumber?: number /* int64 */
  }

  interface ProcessedDeployProto {
    readonly deploy: DeployDataProto
    readonly cost: PCost
    readonly deploylogList?: EventProto[]
    readonly errored?: boolean /* bool */
    readonly systemdeployerror?: string
  }

  interface SlashSystemDeployDataProto {
    readonly invalidblockhash?: Uint8Array /* bytes */
    readonly issuerpublickey?: Uint8Array /* bytes */
  }

  interface CloseBlockSystemDeployDataProto {
    
  }

  interface SystemDeployDataProto {
    readonly slashsystemdeploy?: SlashSystemDeployDataProto
    readonly closeblocksystemdeploy?: CloseBlockSystemDeployDataProto
  }

  interface ProcessedSystemDeployProto {
    readonly systemdeploy: SystemDeployDataProto
    readonly deploylogList?: EventProto[]
    readonly errormsg?: string
  }

  interface BodyProto {
    readonly state: RChainStateProto
    readonly deploysList?: ProcessedDeployProto[]
    readonly systemdeploysList?: ProcessedSystemDeployProto[]
    readonly extrabytes?: Uint8Array /* bytes */
    readonly rejecteddeploysList?: RejectedDeployProto[]
  }

  interface RejectedDeployProto {
    readonly sig?: Uint8Array /* bytes */
  }

  interface JustificationProto {
    readonly validator?: Uint8Array /* bytes */
    readonly latestblockhash?: Uint8Array /* bytes */
  }

  interface RChainStateProto {
    readonly prestatehash?: Uint8Array /* bytes */
    readonly poststatehash?: Uint8Array /* bytes */
    readonly bondsList?: BondProto[]
    readonly blocknumber?: number /* int64 */
  }

  interface EventProto {
    readonly produce?: ProduceEventProto
    readonly consume?: ConsumeEventProto
    readonly comm?: CommEventProto
  }

  interface ProduceEventProto {
    readonly channelshash?: Uint8Array /* bytes */
    readonly hash?: Uint8Array /* bytes */
    readonly persistent?: boolean /* bool */
    readonly timesrepeated?: number /* int32 */
  }

  interface ConsumeEventProto {
    readonly channelshashesList?: Uint8Array[] /* bytes */
    readonly hash?: Uint8Array /* bytes */
    readonly persistent?: boolean /* bool */
  }

  interface CommEventProto {
    readonly consume: ConsumeEventProto
    readonly producesList?: ProduceEventProto[]
    readonly peeksList?: PeekProto[]
  }

  interface PeekProto {
    readonly channelindex?: number /* int32 */
  }

  interface BondProto {
    readonly validator?: Uint8Array /* bytes */
    readonly stake?: number /* int64 */
  }

  interface StoreNodeKeyProto {
    readonly hash?: Uint8Array /* bytes */
    readonly index?: number /* int32 */
  }

  interface StoreItemsMessageRequestProto {
    readonly startpathList?: StoreNodeKeyProto[]
    readonly skip?: number /* int32 */
    readonly take?: number /* int32 */
  }

  interface StoreItemProto {
    readonly key?: Uint8Array /* bytes */
    readonly value?: Uint8Array /* bytes */
  }

  interface StoreItemsMessageProto {
    readonly startpathList?: StoreNodeKeyProto[]
    readonly lastpathList?: StoreNodeKeyProto[]
    readonly historyitemsList?: StoreItemProto[]
    readonly dataitemsList?: StoreItemProto[]
  }

  interface FindDeployQuery {
    readonly deployid?: Uint8Array /* bytes */
  }

  interface BlockQuery {
    readonly hash?: string
  }

  interface ReportQuery {
    readonly hash?: string
    readonly forcereplay?: boolean /* bool */
  }

  interface BlocksQuery {
    readonly depth?: number /* int32 */
  }

  interface BlocksQueryByHeight {
    readonly startblocknumber?: number /* int64 */
    readonly endblocknumber?: number /* int64 */
  }

  interface DataAtNameQuery {
    readonly depth?: number /* int32 */
    readonly name: Par
  }

  interface ContinuationAtNameQuery {
    readonly depth?: number /* int32 */
    readonly namesList?: Par[]
  }

  interface VisualizeDagQuery {
    readonly depth?: number /* int32 */
    readonly showjustificationlines?: boolean /* bool */
    readonly startblocknumber?: number /* int32 */
  }

  interface MachineVerifyQuery {
    
  }

  interface PrivateNamePreviewQuery {
    readonly user?: Uint8Array /* bytes */
    readonly timestamp?: number /* int64 */
    readonly nameqty?: number /* int32 */
  }

  interface LastFinalizedBlockQuery {
    
  }

  interface IsFinalizedQuery {
    readonly hash?: string
  }

  interface BondStatusQuery {
    readonly publickey?: Uint8Array /* bytes */
  }

  interface ExploratoryDeployQuery {
    readonly term?: string
    readonly blockhash?: string
    readonly useprestatehash?: boolean /* bool */
  }

  interface BondInfo {
    readonly validator?: string
    readonly stake?: number /* int64 */
  }

  interface JustificationInfo {
    readonly validator?: string
    readonly latestblockhash?: string
  }

  interface DeployInfo {
    readonly deployer?: string
    readonly term?: string
    readonly timestamp?: number /* int64 */
    readonly sig?: string
    readonly sigalgorithm?: string
    readonly phloprice?: number /* int64 */
    readonly phlolimit?: number /* int64 */
    readonly validafterblocknumber?: number /* int64 */
    readonly cost?: number /* uint64 */
    readonly errored?: boolean /* bool */
    readonly systemdeployerror?: string
  }

  interface LightBlockInfo {
    readonly blockhash?: string
    readonly sender?: string
    readonly seqnum?: number /* int64 */
    readonly sig?: string
    readonly sigalgorithm?: string
    readonly shardid?: string
    readonly extrabytes?: Uint8Array /* bytes */
    readonly version?: number /* int64 */
    readonly timestamp?: number /* int64 */
    readonly headerextrabytes?: Uint8Array /* bytes */
    readonly parentshashlistList?: string[]
    readonly blocknumber?: number /* int64 */
    readonly prestatehash?: string
    readonly poststatehash?: string
    readonly bodyextrabytes?: Uint8Array /* bytes */
    readonly bondsList?: BondInfo[]
    readonly blocksize?: string
    readonly deploycount?: number /* int32 */
    readonly faulttolerance?: number /* float */
    readonly justificationsList?: JustificationInfo[]
    readonly rejecteddeploysList?: RejectedDeployInfo[]
  }

  interface RejectedDeployInfo {
    readonly sig?: string
  }

  interface BlockInfo {
    readonly blockinfo: LightBlockInfo
    readonly deploysList?: DeployInfo[]
  }

  interface DataWithBlockInfo {
    readonly postblockdataList?: Par[]
    readonly block: LightBlockInfo
  }

  interface ContinuationsWithBlockInfo {
    readonly postblockcontinuationsList?: WaitingContinuationInfo[]
    readonly block: LightBlockInfo
  }

  interface WaitingContinuationInfo {
    readonly postblockpatternsList?: BindPattern[]
    readonly postblockcontinuation: Par
  }

  interface ReportProduceProto {
    readonly channel: Par
    readonly data: ListParWithRandom
  }

  interface ReportConsumeProto {
    readonly channelsList?: Par[]
    readonly patternsList?: BindPattern[]
    readonly peeksList?: PeekProto[]
  }

  interface ReportCommProto {
    readonly consume: ReportConsumeProto
    readonly producesList?: ReportProduceProto[]
  }

  interface ReportProto {
    readonly produce?: ReportProduceProto
    readonly consume?: ReportConsumeProto
    readonly comm?: ReportCommProto
  }

  interface SingleReport {
    readonly eventsList?: ReportProto[]
  }

  interface DeployInfoWithEventData {
    readonly deployinfo: DeployInfo
    readonly reportList?: SingleReport[]
  }

  interface SystemDeployInfoWithEventData {
    readonly systemdeploy: SystemDeployDataProto
    readonly reportList?: SingleReport[]
  }

  interface BlockEventInfo {
    readonly blockinfo: LightBlockInfo
    readonly deploysList?: DeployInfoWithEventData[]
    readonly systemdeploysList?: SystemDeployInfoWithEventData[]
    readonly poststatehash?: Uint8Array /* bytes */
  }

  interface EventInfoResponse {
    readonly result?: BlockEventInfo
  }

  interface ExploratoryDeployResponse {
    readonly result?: DataWithBlockInfo
  }

  interface DeployResponse {
    readonly result?: string
  }

  interface BlockResponse {
    readonly blockinfo?: BlockInfo
  }

  interface VisualizeBlocksResponse {
    readonly content?: string
  }

  interface MachineVerifyResponse {
    readonly content?: string
  }

  interface BlockInfoResponse {
    readonly blockinfo?: LightBlockInfo
  }

  interface ListeningNameDataResponse {
    readonly payload?: ListeningNameDataPayload
  }

  interface ListeningNameDataPayload {
    readonly blockinfoList?: DataWithBlockInfo[]
    readonly length?: number /* int32 */
  }

  interface ContinuationAtNameResponse {
    readonly payload?: ContinuationAtNamePayload
  }

  interface ContinuationAtNamePayload {
    readonly blockresultsList?: ContinuationsWithBlockInfo[]
    readonly length?: number /* int32 */
  }

  interface FindDeployResponse {
    readonly blockinfo?: LightBlockInfo
  }

  interface PrivateNamePreviewResponse {
    readonly payload?: PrivateNamePreviewPayload
  }

  interface PrivateNamePreviewPayload {
    readonly idsList?: Uint8Array[] /* bytes */
  }

  interface LastFinalizedBlockResponse {
    readonly blockinfo?: BlockInfo
  }

  interface IsFinalizedResponse {
    readonly isfinalized?: boolean /* bool */
  }

  interface BondStatusResponse {
    readonly isbonded?: boolean /* bool */
  }

  interface ProposeResponse {
    readonly result?: string
  }

  interface ProposeResultResponse {
    readonly result?: string
  }

  interface PrintUnmatchedSendsQuery {
    readonly printunmatchedsends?: boolean /* bool */
  }

  interface ProposeResultQuery {
    
  }

  interface ProposeQuery {
    readonly isasync?: boolean /* bool */
  }

  interface Par {
    readonly sendsList?: Send[]
    readonly receivesList?: Receive[]
    readonly newsList?: New[]
    readonly exprsList?: Expr[]
    readonly matchesList?: Match[]
    readonly unforgeablesList?: GUnforgeable[]
    readonly bundlesList?: Bundle[]
    readonly connectivesList?: Connective[]
    readonly locallyfree?: Uint8Array /* bytes */
    readonly connectiveUsed?: boolean /* bool */
  }

  interface TaggedContinuation {
    readonly parBody?: ParWithRandom
    readonly scalaBodyRef?: number /* int64 */
  }

  interface ParWithRandom {
    readonly body: Par
    readonly randomstate?: Uint8Array /* bytes */
  }

  interface PCost {
    readonly cost?: number /* uint64 */
  }

  interface ListParWithRandom {
    readonly parsList?: Par[]
    readonly randomstate?: Uint8Array /* bytes */
  }

  interface Var {
    readonly boundVar?: number /* sint32 */
    readonly freeVar?: number /* sint32 */
    readonly wildcard?: WildcardMsg
  }

  interface Bundle {
    readonly body: Par
    readonly writeflag?: boolean /* bool */
    readonly readflag?: boolean /* bool */
  }

  interface Send {
    readonly chan: Par
    readonly dataList?: Par[]
    readonly persistent?: boolean /* bool */
    readonly locallyfree?: Uint8Array /* bytes */
    readonly connectiveUsed?: boolean /* bool */
  }

  interface ReceiveBind {
    readonly patternsList?: Par[]
    readonly source: Par
    readonly remainder: Var
    readonly freecount?: number /* int32 */
  }

  interface BindPattern {
    readonly patternsList?: Par[]
    readonly remainder: Var
    readonly freecount?: number /* int32 */
  }

  interface ListBindPatterns {
    readonly patternsList?: BindPattern[]
  }

  interface Receive {
    readonly bindsList?: ReceiveBind[]
    readonly body: Par
    readonly persistent?: boolean /* bool */
    readonly peek?: boolean /* bool */
    readonly bindcount?: number /* int32 */
    readonly locallyfree?: Uint8Array /* bytes */
    readonly connectiveUsed?: boolean /* bool */
  }

  interface New {
    readonly bindcount?: number /* sint32 */
    readonly p: Par
    readonly uriList?: string[]
    readonly injections: Par
    readonly locallyfree?: Uint8Array /* bytes */
  }

  interface MatchCase {
    readonly pattern: Par
    readonly source: Par
    readonly freecount?: number /* int32 */
  }

  interface Match {
    readonly target: Par
    readonly casesList?: MatchCase[]
    readonly locallyfree?: Uint8Array /* bytes */
    readonly connectiveUsed?: boolean /* bool */
  }

  interface Expr {
    readonly gBool?: boolean /* bool */
    readonly gInt?: number /* sint64 */
    readonly gString?: string
    readonly gUri?: string
    readonly gByteArray?: Uint8Array /* bytes */
    readonly eNotBody?: ENot
    readonly eNegBody?: ENeg
    readonly eMultBody?: EMult
    readonly eDivBody?: EDiv
    readonly ePlusBody?: EPlus
    readonly eMinusBody?: EMinus
    readonly eLtBody?: ELt
    readonly eLteBody?: ELte
    readonly eGtBody?: EGt
    readonly eGteBody?: EGte
    readonly eEqBody?: EEq
    readonly eNeqBody?: ENeq
    readonly eAndBody?: EAnd
    readonly eOrBody?: EOr
    readonly eVarBody?: EVar
    readonly eListBody?: EList
    readonly eTupleBody?: ETuple
    readonly eSetBody?: ESet
    readonly eMapBody?: EMap
    readonly eMethodBody?: EMethod
    readonly eMatchesBody?: EMatches
    readonly ePercentPercentBody?: EPercentPercent
    readonly ePlusPlusBody?: EPlusPlus
    readonly eMinusMinusBody?: EMinusMinus
    readonly eModBody?: EMod
  }

  interface EList {
    readonly psList?: Par[]
    readonly locallyfree?: Uint8Array /* bytes */
    readonly connectiveUsed?: boolean /* bool */
    readonly remainder: Var
  }

  interface ETuple {
    readonly psList?: Par[]
    readonly locallyfree?: Uint8Array /* bytes */
    readonly connectiveUsed?: boolean /* bool */
  }

  interface ESet {
    readonly psList?: Par[]
    readonly locallyfree?: Uint8Array /* bytes */
    readonly connectiveUsed?: boolean /* bool */
    readonly remainder: Var
  }

  interface EMap {
    readonly kvsList?: KeyValuePair[]
    readonly locallyfree?: Uint8Array /* bytes */
    readonly connectiveUsed?: boolean /* bool */
    readonly remainder: Var
  }

  interface EMethod {
    readonly methodname?: string
    readonly target: Par
    readonly argumentsList?: Par[]
    readonly locallyfree?: Uint8Array /* bytes */
    readonly connectiveUsed?: boolean /* bool */
  }

  interface KeyValuePair {
    readonly key: Par
    readonly value: Par
  }

  interface EVar {
    readonly v: Var
  }

  interface ENot {
    readonly p: Par
  }

  interface ENeg {
    readonly p: Par
  }

  interface EMult {
    readonly p1: Par
    readonly p2: Par
  }

  interface EDiv {
    readonly p1: Par
    readonly p2: Par
  }

  interface EMod {
    readonly p1: Par
    readonly p2: Par
  }

  interface EPlus {
    readonly p1: Par
    readonly p2: Par
  }

  interface EMinus {
    readonly p1: Par
    readonly p2: Par
  }

  interface ELt {
    readonly p1: Par
    readonly p2: Par
  }

  interface ELte {
    readonly p1: Par
    readonly p2: Par
  }

  interface EGt {
    readonly p1: Par
    readonly p2: Par
  }

  interface EGte {
    readonly p1: Par
    readonly p2: Par
  }

  interface EEq {
    readonly p1: Par
    readonly p2: Par
  }

  interface ENeq {
    readonly p1: Par
    readonly p2: Par
  }

  interface EAnd {
    readonly p1: Par
    readonly p2: Par
  }

  interface EOr {
    readonly p1: Par
    readonly p2: Par
  }

  interface EMatches {
    readonly target: Par
    readonly pattern: Par
  }

  interface EPercentPercent {
    readonly p1: Par
    readonly p2: Par
  }

  interface EPlusPlus {
    readonly p1: Par
    readonly p2: Par
  }

  interface EMinusMinus {
    readonly p1: Par
    readonly p2: Par
  }

  interface Connective {
    readonly connAndBody?: ConnectiveBody
    readonly connOrBody?: ConnectiveBody
    readonly connNotBody?: Par
    readonly varRefBody?: VarRef
    readonly connBool?: boolean /* bool */
    readonly connInt?: boolean /* bool */
    readonly connString?: boolean /* bool */
    readonly connUri?: boolean /* bool */
    readonly connByteArray?: boolean /* bool */
  }

  interface VarRef {
    readonly index?: number /* sint32 */
    readonly depth?: number /* sint32 */
  }

  interface ConnectiveBody {
    readonly psList?: Par[]
  }

  interface DeployId {
    readonly sig?: Uint8Array /* bytes */
  }

  interface DeployerId {
    readonly publickey?: Uint8Array /* bytes */
  }

  interface GUnforgeable {
    readonly gPrivateBody?: GPrivate
    readonly gDeployIdBody?: GDeployId
    readonly gDeployerIdBody?: GDeployerId
    readonly gSysAuthTokenBody?: GSysAuthToken
  }

  interface GPrivate {
    readonly id?: Uint8Array /* bytes */
  }

  interface GDeployId {
    readonly sig?: Uint8Array /* bytes */
  }

  interface GDeployerId {
    readonly publickey?: Uint8Array /* bytes */
  }

  interface GSysAuthToken {
    
  }

  interface ServiceError {
    readonly messagesList?: string[]
  }

  interface CmdRequest {
    readonly line?: string
  }

  interface EvalRequest {
    readonly program?: string
    readonly printunmatchedsendsonly?: boolean /* bool */
  }

  interface ReplResponse {
    readonly output?: string
  }

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
    create(opt_data?: any[]): any
  }

  // Binary operations (serialize / deserialize) for all types
  // - serialize / deserialize functions exposed from generated JS objects
  interface TypesBinary {
    readonly HasBlockRequestProto: BinaryOp<HasBlockRequestProto>
    readonly HasBlockProto: BinaryOp<HasBlockProto>
    readonly BlockRequestProto: BinaryOp<BlockRequestProto>
    readonly ForkChoiceTipRequestProto: BinaryOp<ForkChoiceTipRequestProto>
    readonly ApprovedBlockCandidateProto: BinaryOp<ApprovedBlockCandidateProto>
    readonly UnapprovedBlockProto: BinaryOp<UnapprovedBlockProto>
    readonly Signature: BinaryOp<Signature>
    readonly BlockApprovalProto: BinaryOp<BlockApprovalProto>
    readonly ApprovedBlockProto: BinaryOp<ApprovedBlockProto>
    readonly ApprovedBlockRequestProto: BinaryOp<ApprovedBlockRequestProto>
    readonly NoApprovedBlockAvailableProto: BinaryOp<NoApprovedBlockAvailableProto>
    readonly BlockMessageProto: BinaryOp<BlockMessageProto>
    readonly BlockHashMessageProto: BinaryOp<BlockHashMessageProto>
    readonly BlockMetadataInternal: BinaryOp<BlockMetadataInternal>
    readonly HeaderProto: BinaryOp<HeaderProto>
    readonly DeployDataProto: BinaryOp<DeployDataProto>
    readonly ProcessedDeployProto: BinaryOp<ProcessedDeployProto>
    readonly SlashSystemDeployDataProto: BinaryOp<SlashSystemDeployDataProto>
    readonly CloseBlockSystemDeployDataProto: BinaryOp<CloseBlockSystemDeployDataProto>
    readonly SystemDeployDataProto: BinaryOp<SystemDeployDataProto>
    readonly ProcessedSystemDeployProto: BinaryOp<ProcessedSystemDeployProto>
    readonly BodyProto: BinaryOp<BodyProto>
    readonly RejectedDeployProto: BinaryOp<RejectedDeployProto>
    readonly JustificationProto: BinaryOp<JustificationProto>
    readonly RChainStateProto: BinaryOp<RChainStateProto>
    readonly EventProto: BinaryOp<EventProto>
    readonly ProduceEventProto: BinaryOp<ProduceEventProto>
    readonly ConsumeEventProto: BinaryOp<ConsumeEventProto>
    readonly CommEventProto: BinaryOp<CommEventProto>
    readonly PeekProto: BinaryOp<PeekProto>
    readonly BondProto: BinaryOp<BondProto>
    readonly StoreNodeKeyProto: BinaryOp<StoreNodeKeyProto>
    readonly StoreItemsMessageRequestProto: BinaryOp<StoreItemsMessageRequestProto>
    readonly StoreItemProto: BinaryOp<StoreItemProto>
    readonly StoreItemsMessageProto: BinaryOp<StoreItemsMessageProto>
    readonly FindDeployQuery: BinaryOp<FindDeployQuery>
    readonly BlockQuery: BinaryOp<BlockQuery>
    readonly ReportQuery: BinaryOp<ReportQuery>
    readonly BlocksQuery: BinaryOp<BlocksQuery>
    readonly BlocksQueryByHeight: BinaryOp<BlocksQueryByHeight>
    readonly DataAtNameQuery: BinaryOp<DataAtNameQuery>
    readonly ContinuationAtNameQuery: BinaryOp<ContinuationAtNameQuery>
    readonly VisualizeDagQuery: BinaryOp<VisualizeDagQuery>
    readonly MachineVerifyQuery: BinaryOp<MachineVerifyQuery>
    readonly PrivateNamePreviewQuery: BinaryOp<PrivateNamePreviewQuery>
    readonly LastFinalizedBlockQuery: BinaryOp<LastFinalizedBlockQuery>
    readonly IsFinalizedQuery: BinaryOp<IsFinalizedQuery>
    readonly BondStatusQuery: BinaryOp<BondStatusQuery>
    readonly ExploratoryDeployQuery: BinaryOp<ExploratoryDeployQuery>
    readonly BondInfo: BinaryOp<BondInfo>
    readonly JustificationInfo: BinaryOp<JustificationInfo>
    readonly DeployInfo: BinaryOp<DeployInfo>
    readonly LightBlockInfo: BinaryOp<LightBlockInfo>
    readonly RejectedDeployInfo: BinaryOp<RejectedDeployInfo>
    readonly BlockInfo: BinaryOp<BlockInfo>
    readonly DataWithBlockInfo: BinaryOp<DataWithBlockInfo>
    readonly ContinuationsWithBlockInfo: BinaryOp<ContinuationsWithBlockInfo>
    readonly WaitingContinuationInfo: BinaryOp<WaitingContinuationInfo>
    readonly ReportProduceProto: BinaryOp<ReportProduceProto>
    readonly ReportConsumeProto: BinaryOp<ReportConsumeProto>
    readonly ReportCommProto: BinaryOp<ReportCommProto>
    readonly ReportProto: BinaryOp<ReportProto>
    readonly SingleReport: BinaryOp<SingleReport>
    readonly DeployInfoWithEventData: BinaryOp<DeployInfoWithEventData>
    readonly SystemDeployInfoWithEventData: BinaryOp<SystemDeployInfoWithEventData>
    readonly BlockEventInfo: BinaryOp<BlockEventInfo>
    readonly EventInfoResponse: BinaryOp<EventInfoResponse>
    readonly ExploratoryDeployResponse: BinaryOp<ExploratoryDeployResponse>
    readonly DeployResponse: BinaryOp<DeployResponse>
    readonly BlockResponse: BinaryOp<BlockResponse>
    readonly VisualizeBlocksResponse: BinaryOp<VisualizeBlocksResponse>
    readonly MachineVerifyResponse: BinaryOp<MachineVerifyResponse>
    readonly BlockInfoResponse: BinaryOp<BlockInfoResponse>
    readonly ListeningNameDataResponse: BinaryOp<ListeningNameDataResponse>
    readonly ListeningNameDataPayload: BinaryOp<ListeningNameDataPayload>
    readonly ContinuationAtNameResponse: BinaryOp<ContinuationAtNameResponse>
    readonly ContinuationAtNamePayload: BinaryOp<ContinuationAtNamePayload>
    readonly FindDeployResponse: BinaryOp<FindDeployResponse>
    readonly PrivateNamePreviewResponse: BinaryOp<PrivateNamePreviewResponse>
    readonly PrivateNamePreviewPayload: BinaryOp<PrivateNamePreviewPayload>
    readonly LastFinalizedBlockResponse: BinaryOp<LastFinalizedBlockResponse>
    readonly IsFinalizedResponse: BinaryOp<IsFinalizedResponse>
    readonly BondStatusResponse: BinaryOp<BondStatusResponse>
    readonly ProposeResponse: BinaryOp<ProposeResponse>
    readonly ProposeResultResponse: BinaryOp<ProposeResultResponse>
    readonly PrintUnmatchedSendsQuery: BinaryOp<PrintUnmatchedSendsQuery>
    readonly ProposeResultQuery: BinaryOp<ProposeResultQuery>
    readonly ProposeQuery: BinaryOp<ProposeQuery>
    readonly Par: BinaryOp<Par>
    readonly TaggedContinuation: BinaryOp<TaggedContinuation>
    readonly ParWithRandom: BinaryOp<ParWithRandom>
    readonly PCost: BinaryOp<PCost>
    readonly ListParWithRandom: BinaryOp<ListParWithRandom>
    readonly Var: BinaryOp<Var>
    readonly Bundle: BinaryOp<Bundle>
    readonly Send: BinaryOp<Send>
    readonly ReceiveBind: BinaryOp<ReceiveBind>
    readonly BindPattern: BinaryOp<BindPattern>
    readonly ListBindPatterns: BinaryOp<ListBindPatterns>
    readonly Receive: BinaryOp<Receive>
    readonly New: BinaryOp<New>
    readonly MatchCase: BinaryOp<MatchCase>
    readonly Match: BinaryOp<Match>
    readonly Expr: BinaryOp<Expr>
    readonly EList: BinaryOp<EList>
    readonly ETuple: BinaryOp<ETuple>
    readonly ESet: BinaryOp<ESet>
    readonly EMap: BinaryOp<EMap>
    readonly EMethod: BinaryOp<EMethod>
    readonly KeyValuePair: BinaryOp<KeyValuePair>
    readonly EVar: BinaryOp<EVar>
    readonly ENot: BinaryOp<ENot>
    readonly ENeg: BinaryOp<ENeg>
    readonly EMult: BinaryOp<EMult>
    readonly EDiv: BinaryOp<EDiv>
    readonly EMod: BinaryOp<EMod>
    readonly EPlus: BinaryOp<EPlus>
    readonly EMinus: BinaryOp<EMinus>
    readonly ELt: BinaryOp<ELt>
    readonly ELte: BinaryOp<ELte>
    readonly EGt: BinaryOp<EGt>
    readonly EGte: BinaryOp<EGte>
    readonly EEq: BinaryOp<EEq>
    readonly ENeq: BinaryOp<ENeq>
    readonly EAnd: BinaryOp<EAnd>
    readonly EOr: BinaryOp<EOr>
    readonly EMatches: BinaryOp<EMatches>
    readonly EPercentPercent: BinaryOp<EPercentPercent>
    readonly EPlusPlus: BinaryOp<EPlusPlus>
    readonly EMinusMinus: BinaryOp<EMinusMinus>
    readonly Connective: BinaryOp<Connective>
    readonly VarRef: BinaryOp<VarRef>
    readonly ConnectiveBody: BinaryOp<ConnectiveBody>
    readonly DeployId: BinaryOp<DeployId>
    readonly DeployerId: BinaryOp<DeployerId>
    readonly GUnforgeable: BinaryOp<GUnforgeable>
    readonly GPrivate: BinaryOp<GPrivate>
    readonly GDeployId: BinaryOp<GDeployId>
    readonly GDeployerId: BinaryOp<GDeployerId>
    readonly GSysAuthToken: BinaryOp<GSysAuthToken>
    readonly ServiceError: BinaryOp<ServiceError>
    readonly CmdRequest: BinaryOp<CmdRequest>
    readonly EvalRequest: BinaryOp<EvalRequest>
    readonly ReplResponse: BinaryOp<ReplResponse>
  }
}

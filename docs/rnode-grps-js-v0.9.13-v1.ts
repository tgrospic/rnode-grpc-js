declare module "@tgrospic/rnode-grpc-js_v1" {
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

  interface DeployService {
    DoDeploy(_?: DeployData): Promise<DeployServiceResponse>
    getBlock(_?: BlockQuery): Promise<BlockQueryResponse>
    visualizeDag(_?: VisualizeDagQuery): Promise<VisualizeBlocksResponse[]>
    machineVerifiableDag(_?: MachineVerifyQuery): Promise<Unit>
    showMainChain(_?: BlocksQuery): Promise<LightBlockInfo[]>
    getBlocks(_?: BlocksQuery): Promise<LightBlockInfo[]>
    listenForDataAtName(_: DataAtNameQuery): Promise<ListeningNameDataResponse>
    listenForContinuationAtName(_: ContinuationAtNameQuery): Promise<ListeningNameContinuationResponse>
    findDeploy(_?: FindDeployQuery): Promise<LightBlockQueryResponse>
    previewPrivateNames(_?: PrivateNamePreviewQuery): Promise<PrivateNamePreviewResponse>
    lastFinalizedBlock(_?: LastFinalizedBlockQuery): Promise<LastFinalizedBlockResponse>
    isFinalized(_?: IsFinalizedQuery): Promise<IsFinalizedResponse>
  }

  interface ProposeService {
    propose(_?: PrintUnmatchedSendsQuery): Promise<Unit>
  }

  interface Repl {
    Run(_?: CmdRequest): Promise<ReplResponse>
    Eval(_?: EvalRequest): Promise<ReplResponse>
  }

  interface Unit {}

  // TODO: add support to generate nested types
  interface WildcardMsg {}

  interface UnsignedDeployData {
    term: String
    timestamp?: Number | Long
    phloLimit: Number | Long
    phloPrice?: Number | Long
    validAfterBlockNumber?: Number | Long
  }

  interface HasBlockRequest {
    hash?: Uint8Array /* bytes */
  }

  interface HasBlock {
    hash?: Uint8Array /* bytes */
  }

  interface BlockRequest {
    hash?: Uint8Array /* bytes */
  }

  interface ForkChoiceTipRequest {

  }

  interface ApprovedBlockCandidate {
    block: BlockMessage
    requiredSigs?: number /* int32 */
  }

  interface UnapprovedBlock {
    candidate: ApprovedBlockCandidate
    timestamp?: number | Long /* int64 */
    duration?: number | Long /* int64 */
  }

  interface Signature {
    publicKey?: Uint8Array /* bytes */
    algorithm?: string
    sig?: Uint8Array /* bytes */
  }

  interface BlockApproval {
    candidate: ApprovedBlockCandidate
    sig: Signature
  }

  interface ApprovedBlock {
    candidate: ApprovedBlockCandidate
    sigs?: Signature[]
  }

  interface ApprovedBlockRequest {
    identifier?: string
  }

  interface NoApprovedBlockAvailable {
    identifier?: string
    nodeIdentifer?: string
  }

  interface BlockMessage {
    blockHash?: Uint8Array /* bytes */
    header: Header
    body: Body
    justifications?: Justification[]
    sender?: Uint8Array /* bytes */
    seqNum?: number /* int32 */
    sig?: Uint8Array /* bytes */
    sigAlgorithm?: string
    shardId?: string
    extraBytes?: Uint8Array /* bytes */
  }

  interface BlockMetadataInternal {
    blockHash?: Uint8Array /* bytes */
    parents?: Uint8Array[] /* bytes */
    sender?: Uint8Array /* bytes */
    justifications?: Justification[]
    bonds?: Bond[]
    blockNum?: number | Long /* int64 */
    seqNum?: number /* int32 */
    invalid?: boolean /* bool */
  }

  interface Header {
    parentsHashList?: Uint8Array[] /* bytes */
    deploysHash?: Uint8Array /* bytes */
    timestamp?: number | Long /* int64 */
    version?: number | Long /* int64 */
    deployCount?: number /* int32 */
    extraBytes?: Uint8Array /* bytes */
  }

  interface DeployData {
    deployer?: Uint8Array /* bytes */
    term?: string
    timestamp?: number | Long /* int64 */
    sig?: Uint8Array /* bytes */
    sigAlgorithm?: string
    phloPrice?: number | Long /* int64 */
    phloLimit?: number | Long /* int64 */
    validAfterBlockNumber?: number | Long /* int64 */
  }

  interface ProcessedDeploy {
    deploy: DeployData
    cost: PCost
    deployLog?: Event[]
    paymentLog?: Event[]
    errored?: boolean /* bool */
  }

  interface Body {
    state: RChainState
    deploys?: ProcessedDeploy[]
    extraBytes?: Uint8Array /* bytes */
  }

  interface Justification {
    validator?: Uint8Array /* bytes */
    latestBlockHash?: Uint8Array /* bytes */
  }

  interface RChainState {
    preStateHash?: Uint8Array /* bytes */
    postStateHash?: Uint8Array /* bytes */
    bonds?: Bond[]
    blockNumber?: number | Long /* int64 */
  }

  interface Event {
    produce?: ProduceEvent
    consume?: ConsumeEvent
    comm?: CommEvent
  }

  interface ProduceEvent {
    channelsHash?: Uint8Array /* bytes */
    hash?: Uint8Array /* bytes */
    persistent?: boolean /* bool */
    sequenceNumber?: number /* int32 */
  }

  interface ConsumeEvent {
    channelsHashes?: Uint8Array[] /* bytes */
    hash?: Uint8Array /* bytes */
    persistent?: boolean /* bool */
    sequenceNumber?: number /* int32 */
  }

  interface CommEvent {
    consume: ConsumeEvent
    produces?: ProduceEvent[]
    peeks?: Peek[]
  }

  interface Peek {
    channelIndex?: number /* int32 */
  }

  interface Bond {
    validator?: Uint8Array /* bytes */
    stake?: number | Long /* int64 */
  }

  interface DeployServiceResponse {
    message?: string
  }

  interface BlockQueryResponse {
    blockInfo: BlockInfo
  }

  interface LightBlockQueryResponse {
    blockInfo: LightBlockInfo
  }

  interface VisualizeBlocksResponse {
    content?: string
  }

  interface MachineVerifyResponse {
    content?: string
  }

  interface ListeningNameDataResponse {
    blockResults?: DataWithBlockInfo[]
    length?: number /* int32 */
  }

  interface ListeningNameContinuationResponse {
    blockResults?: ContinuationsWithBlockInfo[]
    length?: number /* int32 */
  }

  interface PrivateNamePreviewResponse {
    ids?: Uint8Array[] /* bytes */
  }

  interface LastFinalizedBlockResponse {
    blockInfo: BlockInfo
  }

  interface IsFinalizedResponse {
    isFinalized?: boolean /* bool */
  }

  interface DeployServiceResponseMeta {
    DoDeploy: DeployServiceResponse
    getBlock: BlockQueryResponse
    visualizeDag: VisualizeBlocksResponse
    showMainChain: LightBlockInfo
    getBlocks: LightBlockInfo
    listenForDataAtName: ListeningNameDataResponse
    listenForContinuationAtName: ListeningNameContinuationResponse
    findDeploy: LightBlockQueryResponse
    previewPrivateNames: PrivateNamePreviewResponse
    lastFinalizedBlock: BlockQueryResponse
  }

  interface FindDeployQuery {
    deployId?: Uint8Array /* bytes */
  }

  interface BlockQuery {
    hash?: string
  }

  interface BlocksQuery {
    depth?: number /* int32 */
  }

  interface DataAtNameQuery {
    depth?: number /* int32 */
    name: Par
  }

  interface ContinuationAtNameQuery {
    depth?: number /* int32 */
    names?: Par[]
  }

  interface VisualizeDagQuery {
    depth?: number /* int32 */
    showJustificationLines?: boolean /* bool */
  }

  interface MachineVerifyQuery {

  }

  interface PrivateNamePreviewQuery {
    user?: Uint8Array /* bytes */
    timestamp?: number | Long /* int64 */
    nameQty?: number /* int32 */
  }

  interface LastFinalizedBlockQuery {

  }

  interface IsFinalizedQuery {
    hash?: string
  }

  interface LightBlockInfo {
    blockHash?: string
    blockSize?: string
    blockNumber?: number | Long /* int64 */
    version?: number | Long /* int64 */
    deployCount?: number /* int32 */
    tupleSpaceHash?: string
    timestamp?: number | Long /* int64 */
    faultTolerance?: number /* float */
    mainParentHash?: string
    parentsHashList?: string[]
    sender?: string
  }

  interface BlockInfo {
    blockHash?: string
    blockSize?: string
    blockNumber?: number | Long /* int64 */
    version?: number | Long /* int64 */
    deployCount?: number /* int32 */
    tupleSpaceHash?: string
    timestamp?: number | Long /* int64 */
    faultTolerance?: number /* float */
    mainParentHash?: string
    parentsHashList?: string[]
    sender?: string
    shardId?: string
    bondsValidatorList?: string[]
    deployCost?: string[]
  }

  interface DataWithBlockInfo {
    postBlockData?: Par[]
    block: LightBlockInfo
  }

  interface ContinuationsWithBlockInfo {
    postBlockContinuations?: WaitingContinuationInfo[]
    block: LightBlockInfo
  }

  interface WaitingContinuationInfo {
    postBlockPatterns?: BindPattern[]
    postBlockContinuation: Par
  }

  interface Par {
    sends?: Send[]
    receives?: Receive[]
    news?: New[]
    exprs?: Expr[]
    matches?: Match[]
    unforgeables?: GUnforgeable[]
    bundles?: Bundle[]
    connectives?: Connective[]
    locallyFree?: Uint8Array /* bytes */
    connectiveUsed?: boolean /* bool */
  }

  interface TaggedContinuation {
    parBody?: ParWithRandom
    scalaBodyRef?: number | Long /* int64 */
  }

  interface ParWithRandom {
    body: Par
    randomState?: Uint8Array /* bytes */
  }

  interface PCost {
    cost?: number | Long /* uint64 */
  }

  interface ListParWithRandom {
    pars?: Par[]
    randomState?: Uint8Array /* bytes */
  }

  interface Var {
    boundVar?: number /* sint32 */
    freeVar?: number /* sint32 */
    wildcard?: WildcardMsg
  }

  interface Bundle {
    body: Par
    writeFlag?: boolean /* bool */
    readFlag?: boolean /* bool */
  }

  interface Send {
    chan: Par
    data?: Par[]
    persistent?: boolean /* bool */
    locallyFree?: Uint8Array /* bytes */
    connectiveUsed?: boolean /* bool */
  }

  interface ReceiveBind {
    patterns?: Par[]
    source: Par
    remainder: Var
    freeCount?: number /* int32 */
  }

  interface BindPattern {
    patterns?: Par[]
    remainder: Var
    freeCount?: number /* int32 */
  }

  interface ListBindPatterns {
    patterns?: BindPattern[]
  }

  interface Receive {
    binds?: ReceiveBind[]
    body: Par
    persistent?: boolean /* bool */
    peek?: boolean /* bool */
    bindCount?: number /* int32 */
    locallyFree?: Uint8Array /* bytes */
    connectiveUsed?: boolean /* bool */
  }

  interface New {
    bindCount?: number /* sint32 */
    p: Par
    uri?: string[]
    deployId: DeployId
    deployerId: DeployerId
    locallyFree?: Uint8Array /* bytes */
  }

  interface MatchCase {
    pattern: Par
    source: Par
    freeCount?: number /* int32 */
  }

  interface Match {
    target: Par
    cases?: MatchCase[]
    locallyFree?: Uint8Array /* bytes */
    connectiveUsed?: boolean /* bool */
  }

  interface Expr {
    gBool?: boolean /* bool */
    gInt?: number | Long /* sint64 */
    gString?: string
    gUri?: string
    gByteArray?: Uint8Array /* bytes */
    eNotBody?: ENot
    eNegBody?: ENeg
    eMultBody?: EMult
    eDivBody?: EDiv
    ePlusBody?: EPlus
    eMinusBody?: EMinus
    eLtBody?: ELt
    eLteBody?: ELte
    eGtBody?: EGt
    eGteBody?: EGte
    eEqBody?: EEq
    eNeqBody?: ENeq
    eAndBody?: EAnd
    eOrBody?: EOr
    eVarBody?: EVar
    eListBody?: EList
    eTupleBody?: ETuple
    eSetBody?: ESet
    eMapBody?: EMap
    eMethodBody?: EMethod
    eMatchesBody?: EMatches
    ePercentPercentBody?: EPercentPercent
    ePlusPlusBody?: EPlusPlus
    eMinusMinusBody?: EMinusMinus
    eModBody?: EMod
  }

  interface EList {
    ps?: Par[]
    locallyFree?: Uint8Array /* bytes */
    connectiveUsed?: boolean /* bool */
    remainder: Var
  }

  interface ETuple {
    ps?: Par[]
    locallyFree?: Uint8Array /* bytes */
    connectiveUsed?: boolean /* bool */
  }

  interface ESet {
    ps?: Par[]
    locallyFree?: Uint8Array /* bytes */
    connectiveUsed?: boolean /* bool */
    remainder: Var
  }

  interface EMap {
    kvs?: KeyValuePair[]
    locallyFree?: Uint8Array /* bytes */
    connectiveUsed?: boolean /* bool */
    remainder: Var
  }

  interface EMethod {
    methodName?: string
    target: Par
    arguments?: Par[]
    locallyFree?: Uint8Array /* bytes */
    connectiveUsed?: boolean /* bool */
  }

  interface KeyValuePair {
    key: Par
    value: Par
  }

  interface EVar {
    v: Var
  }

  interface ENot {
    p: Par
  }

  interface ENeg {
    p: Par
  }

  interface EMult {
    p1: Par
    p2: Par
  }

  interface EDiv {
    p1: Par
    p2: Par
  }

  interface EMod {
    p1: Par
    p2: Par
  }

  interface EPlus {
    p1: Par
    p2: Par
  }

  interface EMinus {
    p1: Par
    p2: Par
  }

  interface ELt {
    p1: Par
    p2: Par
  }

  interface ELte {
    p1: Par
    p2: Par
  }

  interface EGt {
    p1: Par
    p2: Par
  }

  interface EGte {
    p1: Par
    p2: Par
  }

  interface EEq {
    p1: Par
    p2: Par
  }

  interface ENeq {
    p1: Par
    p2: Par
  }

  interface EAnd {
    p1: Par
    p2: Par
  }

  interface EOr {
    p1: Par
    p2: Par
  }

  interface EMatches {
    target: Par
    pattern: Par
  }

  interface EPercentPercent {
    p1: Par
    p2: Par
  }

  interface EPlusPlus {
    p1: Par
    p2: Par
  }

  interface EMinusMinus {
    p1: Par
    p2: Par
  }

  interface Connective {
    connAndBody?: ConnectiveBody
    connOrBody?: ConnectiveBody
    connNotBody?: Par
    varRefBody?: VarRef
    connBool?: boolean /* bool */
    connInt?: boolean /* bool */
    connString?: boolean /* bool */
    connUri?: boolean /* bool */
    connByteArray?: boolean /* bool */
  }

  interface VarRef {
    index?: number /* sint32 */
    depth?: number /* sint32 */
  }

  interface ConnectiveBody {
    ps?: Par[]
  }

  interface DeployId {
    sig?: Uint8Array /* bytes */
  }

  interface DeployerId {
    publicKey?: Uint8Array /* bytes */
  }

  interface GUnforgeable {
    gPrivateBody?: GPrivate
    gDeployIdBody?: GDeployId
    gDeployerIdBody?: GDeployerId
  }

  interface GPrivate {
    id?: Uint8Array /* bytes */
  }

  interface GDeployId {
    sig?: Uint8Array /* bytes */
  }

  interface GDeployerId {
    publicKey?: Uint8Array /* bytes */
  }

  interface EitherAny {
    typeUrl?: string
    value?: Uint8Array /* bytes */
  }

  interface EitherError {
    messages?: string[]
  }

  interface EitherSuccess {
    response: EitherAny
  }

  interface Either {
    error?: EitherError
    success?: EitherSuccess
  }

  interface ServiceError {
    messages?: string[]
  }

  interface PrintUnmatchedSendsQuery {
    printUnmatchedSends?: boolean /* bool */
  }

  interface CmdRequest {
    line?: string
  }

  interface EvalRequest {
    program?: string
    printUnmatchedSendsOnly?: boolean /* bool */
  }

  interface ReplResponse {
    output?: string
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
    create(opt_data: any[]): any
  }

  // Binary operations (serialize / deserialize) for all types
  // - serialize / deserialize functions exposed from generated JS objects
  interface TypesBinary {
    HasBlockRequest: BinaryOp<HasBlockRequest>
    HasBlock: BinaryOp<HasBlock>
    BlockRequest: BinaryOp<BlockRequest>
    ForkChoiceTipRequest: BinaryOp<ForkChoiceTipRequest>
    ApprovedBlockCandidate: BinaryOp<ApprovedBlockCandidate>
    UnapprovedBlock: BinaryOp<UnapprovedBlock>
    Signature: BinaryOp<Signature>
    BlockApproval: BinaryOp<BlockApproval>
    ApprovedBlock: BinaryOp<ApprovedBlock>
    ApprovedBlockRequest: BinaryOp<ApprovedBlockRequest>
    NoApprovedBlockAvailable: BinaryOp<NoApprovedBlockAvailable>
    BlockMessage: BinaryOp<BlockMessage>
    BlockMetadataInternal: BinaryOp<BlockMetadataInternal>
    Header: BinaryOp<Header>
    DeployData: BinaryOp<DeployData>
    ProcessedDeploy: BinaryOp<ProcessedDeploy>
    Body: BinaryOp<Body>
    Justification: BinaryOp<Justification>
    RChainState: BinaryOp<RChainState>
    Event: BinaryOp<Event>
    ProduceEvent: BinaryOp<ProduceEvent>
    ConsumeEvent: BinaryOp<ConsumeEvent>
    CommEvent: BinaryOp<CommEvent>
    Peek: BinaryOp<Peek>
    Bond: BinaryOp<Bond>
    DeployServiceResponse: BinaryOp<DeployServiceResponse>
    BlockQueryResponse: BinaryOp<BlockQueryResponse>
    LightBlockQueryResponse: BinaryOp<LightBlockQueryResponse>
    VisualizeBlocksResponse: BinaryOp<VisualizeBlocksResponse>
    MachineVerifyResponse: BinaryOp<MachineVerifyResponse>
    ListeningNameDataResponse: BinaryOp<ListeningNameDataResponse>
    ListeningNameContinuationResponse: BinaryOp<ListeningNameContinuationResponse>
    PrivateNamePreviewResponse: BinaryOp<PrivateNamePreviewResponse>
    LastFinalizedBlockResponse: BinaryOp<LastFinalizedBlockResponse>
    IsFinalizedResponse: BinaryOp<IsFinalizedResponse>
    DeployServiceResponseMeta: BinaryOp<DeployServiceResponseMeta>
    FindDeployQuery: BinaryOp<FindDeployQuery>
    BlockQuery: BinaryOp<BlockQuery>
    BlocksQuery: BinaryOp<BlocksQuery>
    DataAtNameQuery: BinaryOp<DataAtNameQuery>
    ContinuationAtNameQuery: BinaryOp<ContinuationAtNameQuery>
    VisualizeDagQuery: BinaryOp<VisualizeDagQuery>
    MachineVerifyQuery: BinaryOp<MachineVerifyQuery>
    PrivateNamePreviewQuery: BinaryOp<PrivateNamePreviewQuery>
    LastFinalizedBlockQuery: BinaryOp<LastFinalizedBlockQuery>
    IsFinalizedQuery: BinaryOp<IsFinalizedQuery>
    LightBlockInfo: BinaryOp<LightBlockInfo>
    BlockInfo: BinaryOp<BlockInfo>
    DataWithBlockInfo: BinaryOp<DataWithBlockInfo>
    ContinuationsWithBlockInfo: BinaryOp<ContinuationsWithBlockInfo>
    WaitingContinuationInfo: BinaryOp<WaitingContinuationInfo>
    Par: BinaryOp<Par>
    TaggedContinuation: BinaryOp<TaggedContinuation>
    ParWithRandom: BinaryOp<ParWithRandom>
    PCost: BinaryOp<PCost>
    ListParWithRandom: BinaryOp<ListParWithRandom>
    Var: BinaryOp<Var>
    Bundle: BinaryOp<Bundle>
    Send: BinaryOp<Send>
    ReceiveBind: BinaryOp<ReceiveBind>
    BindPattern: BinaryOp<BindPattern>
    ListBindPatterns: BinaryOp<ListBindPatterns>
    Receive: BinaryOp<Receive>
    New: BinaryOp<New>
    MatchCase: BinaryOp<MatchCase>
    Match: BinaryOp<Match>
    Expr: BinaryOp<Expr>
    EList: BinaryOp<EList>
    ETuple: BinaryOp<ETuple>
    ESet: BinaryOp<ESet>
    EMap: BinaryOp<EMap>
    EMethod: BinaryOp<EMethod>
    KeyValuePair: BinaryOp<KeyValuePair>
    EVar: BinaryOp<EVar>
    ENot: BinaryOp<ENot>
    ENeg: BinaryOp<ENeg>
    EMult: BinaryOp<EMult>
    EDiv: BinaryOp<EDiv>
    EMod: BinaryOp<EMod>
    EPlus: BinaryOp<EPlus>
    EMinus: BinaryOp<EMinus>
    ELt: BinaryOp<ELt>
    ELte: BinaryOp<ELte>
    EGt: BinaryOp<EGt>
    EGte: BinaryOp<EGte>
    EEq: BinaryOp<EEq>
    ENeq: BinaryOp<ENeq>
    EAnd: BinaryOp<EAnd>
    EOr: BinaryOp<EOr>
    EMatches: BinaryOp<EMatches>
    EPercentPercent: BinaryOp<EPercentPercent>
    EPlusPlus: BinaryOp<EPlusPlus>
    EMinusMinus: BinaryOp<EMinusMinus>
    Connective: BinaryOp<Connective>
    VarRef: BinaryOp<VarRef>
    ConnectiveBody: BinaryOp<ConnectiveBody>
    DeployId: BinaryOp<DeployId>
    DeployerId: BinaryOp<DeployerId>
    GUnforgeable: BinaryOp<GUnforgeable>
    GPrivate: BinaryOp<GPrivate>
    GDeployId: BinaryOp<GDeployId>
    GDeployerId: BinaryOp<GDeployerId>
    EitherAny: BinaryOp<EitherAny>
    EitherError: BinaryOp<EitherError>
    EitherSuccess: BinaryOp<EitherSuccess>
    Either: BinaryOp<Either>
    ServiceError: BinaryOp<ServiceError>
    PrintUnmatchedSendsQuery: BinaryOp<PrintUnmatchedSendsQuery>
    CmdRequest: BinaryOp<CmdRequest>
    EvalRequest: BinaryOp<EvalRequest>
    ReplResponse: BinaryOp<ReplResponse>
  }
}

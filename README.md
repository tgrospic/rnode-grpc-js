# RNode gRPC API generator

This library helps to generate **JavaScript** bindings for **RNode gRPC API**.

Examples of how to use it with **Nodejs** and in the **browser** are in [@tgrospic/rnode-client-js](https://github.com/tgrospic/rnode-client-js) repository.

RNode also exposes **HTTP** natively with **RNode Web API**, for more information see [@tgrospic/rnode-http-js](https://github.com/tgrospic/rnode-http-js).

__Deploys sent via Web API still have to be serialized with protobuf, but it's not necessary to use this library and generate any JS code. [rnode-sign.ts](src/rnode-sign.ts) can be used independently in your web project.__

_gRPC is not supported in the browser but it can be used with the proxy. Here is the example of [Envoy configuration](https://github.com/grpc/grpc-web/blob/952d0f5869b315039a994011ecb5bf57dfdea999/net/grpc/gateway/examples/helloworld/envoy.yaml) to run your own _HTTP/gRPC_ proxy._


#### It contains two parts:
- `rnode-grpc` CLI to generate JS files with **TypeScript definitions**
- helper functions to create **JS client** with **Promise** based **RNode** service methods.

## Install

```sh
npm install @tgrospic/rnode-grpc-js

# gRPC and protobuf for use with Nodejs
# - compatible with native `grpc` package
npm install google-protobuf @grpc/grpc-js
# Or for use in the browser (via Envoy proxy)
npm install google-protobuf grpc-web

# For crypto operations (create private key)
npm install elliptic
```

Install peer dependencies needed to generate JS files from proto definitions.

```sh
npm install --save-dev grpc-tools protobufjs
```

## Generate JS files

The purpose of `rnode-grpc` CLI command is to download and generate necessary files.

```sh
# Generate all files with default options (run from your package.json scripts)
rnode-grpc

# Generate with specific options
rnode-grpc --rnode-version v0.12.4 --gen-dir ./rnode-grpc-gen

# Run from your project folder
node_modules/.bin/rnode-grpc
```
## CLI options

| Option             | Default            | Description
| -------------------| ------------------ | ------------
| --rnode-version    | `v0.12.4`          | Version (repo tag) of RNode to generate API.
| --gen-dir          | `./rnode-grpc-gen` | Path to output directory.

<details>
<summary>Additional use for RNode version option</summary>

We can generate API from not yet published RNode version. From any branch on [rchain/rchain](https://github.com/rchain/rchain) repo, e.g. `dev` branch.

```sh
rnode-grpc --rnode-version dev
```
And make requests to new _DeployService_ method `isFinalized`. :smile:

```typescript
interface DeployService {
  // Not yet available in v0.9.12 RNode
  isFinalized(_?: IsFinalizedQuery): Promise<IsFinalizedResponse>
  // ...existing methods
}
```
</details>

## API

Complete API is combined from the part provided by the library and the generated part for a specific version of RNode.

Documentation for library part can be found here [https://tgrospic.github.io/rnode-grpc-js/](https://tgrospic.github.io/rnode-grpc-js/) and generated part with TypeScript definitions can be found in a directory specified by `--gen-dir` option.

More info for client options for [@grpc/grpc-js](https://github.com/grpc/grpc-node/blob/b05caec/packages/grpc-js/src/client.ts#L67) and [grpc-web](https://github.com/grpc/grpc-web/blob/8b501a96f/javascript/net/grpc/web/grpcwebclientbase.js#L45).

```typescript
interface Options {
  // gRPC protocol implementation
  // - `@grpc/grpc-js` for Nodejs
  // - `grpc-web` for browser
  grpcLib: any
  // Custom options for gRPC clients
  // - `credentials` can be supplied as part of `clientOptions` for `grpc-js`
  clientOptions?: any,
  // RNode host (method prefix)
  host: string,
  // Generated JSON schema
  protoSchema: Object
}

// Get deploy service methods
rnodeDeploy(opt: Options): DeployService

// Get propose service methods
rnodePropose(opt: Options): ProposeService

// Get repl service methods
rnodeRepl(opt: Options): Repl

// Get all service methods
rnodeService(opt: Options): DeployService & ProposeService & Repl

// Sign deploy data
signDeploy(key: string | Uint8Array | Buffer | ec.KeyPair, deploy: UnsignedDeployData): DeployDataProto

// Verify deploy signature
verifyDeploy(deploy: DeployDataProto): Boolean

// Protobuf serialize / deserialize operations
rnodeProtobuf({protoSchema}): TypesBinary

// Transform Par type to JSON (with meaningful defaults)
rhoParToJson(input: Par): any
```

### TypeScript definitions

Here is an example of [TypeScript definition file](docs/rnode-grpc-js-v0.12.4.d.ts) generated for `v0.12.4` version of RNode.

```sh
# Run CLI command with an option to specify RNode version (Git repo release tag)
rnode-grpc --rnode-version v0.12.4
```
_Generated TypeScript definitions are complete with the conversion of response errors inside the message to `Promise` errors. For RNode after `v0.9.14` version `ServiceError` type is converted and on previous versions the same conversion is done on a _dynamic_ `Either` type._ :smile:

```typescript
// Typescipt generated interface from RNode v0.12.4 protbuf definitions
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
```

## Sample code for gRPC requests to RNode

_NOTE: RNode also exposes **HTTP** natively with **RNode Web API**, for more information see [@tgrospic/rnode-http-js](https://github.com/tgrospic/rnode-http-js)._

Using gRPC in the browser is not supported but it's possible with gRPC-HTTP proxy and [grpc-web](https://github.com/grpc/grpc-web) library.

Working version of these examples can be found in [@tgrospic/rnode-client-js/src/nodejs](https://github.com/tgrospic/rnode-client-js/tree/master/src/nodejs).

```typescript
/// <reference path="../rnode-grpc-gen/js/rnode-grpc-js.d.ts" />
import grpcLib from '@grpc/grpc-js'
// import grpcLib from 'grpc-web' // when using gRPC-HTTP proxy
import { ec } from 'elliptic'
import { rnodeDeploy, rnodePropose, signDeploy, verifyDeploy, LightBlockInfo } from '@tgrospic/rnode-grpc-js'

// Generated files with rnode-grpc-js tool
import protoSchema from '../rnode-grpc-gen/js/pbjs_generated.json'
// Import generated protobuf types (in global scope)
import '../rnode-grpc-gen/js/DeployServiceV1_pb'
import '../rnode-grpc-gen/js/ProposeServiceV1_pb'

// RNode validator address (or any read-only RNode if we don't use _deploy_ and _propose_)
const rnodeExternalUrl = 'node2.testnet.rchain.coop:40401'
// const rnodeExternalUrl = 'https://<host>:<port>' // when using gRPC-HTTP proxy

// gRPC client options
const options = { grpcLib: grpcLib, host: rnodeExternalUrl, protoSchema }

// Get RNode service methods
const { getBlocks, DoDeploy } = rnodeDeploy(options)
const { propose }             = rnodePropose(options)

// Get blocks from RNode
const blocks: LightBlockInfo[] = await getBlocks({ depth: 2 })

// Generate sample KeyPair (private/public keys) to sign the deploy
const secp256k1 = new ec('secp256k1')
const key = secp256k1.genKeyPair()
// Or use existing as hex string or Uint8Array
// const key = '1bf36a3d89c27ddef7955684b97667c75454317d8964528e57b2308947b250b0'

// Sample Rholang code we want to deploy
const deployData = {
  term: 'new out(`rho:io:stdout`) in { out!("Browser deploy test") }',
  timestamp: Date.now(),      // nonce
  phloprice: 1,               // price of tinny REV for phlogiston (gas)
  phlolimit: 10e3,            // max phlogiston (gas) for deploy execution
  validafterblocknumber: 123, // latest block number
}

// Helper function to sign a deploy
// - this can be done when offline and save the signed deploy as JSON
const deploy = signDeploy(key, deployData)

// and to check the signature
const isValidDeploy = verifyDeploy(deploy)

// Send signed deploy to RNode
const { message } = await DoDeploy(deploy)

// Propose deploys to the rest of the network
// - this is done by the validator and allowed only on internal (private) port
await propose()

// Get result from deploy (after deploy is added to a block)
const { payload: { blockinfoList } } = await listenForDataAtName({
  depth: 1,
  name: { unforgeablesList: [{gDeployIdBody: { sig: deploy.sig }}] },
})
```
#### Protobuf serialize and deserialize operations

```typescript
/// <reference path="../rnode-grpc-gen/js/rnode-grpc-js.d.ts" />
// Generated protobuf files must be loaded to instantiate a global proto object
// needed for `rnodeProtobuf`
require('../rnode-grpc-gen/js/DeployServiceV1_pb')
require('../rnode-grpc-gen/js/ProposeServiceV1_pb')
require('../rnode-grpc-gen/js/repl_pb')
const protoSchema = require('../rnode-grpc-gen/js/pbjs_generated.json')

const { rnodeProtobuf } = require('@tgrospic/rnode-grpc-js')

// Get types with serialize and deserialize operations
const { DeployDataProto, CmdRequest } = rnodeProtobuf({ protoSchema })

const deployBytes = DeployDataProto.serialize({ term: 'Nil', phlolimit: 1000 })

const deployObj: DeployDataProto = DeployDataProto.deserialize(deployBytes)
```

## What is the difference with RChain-API?

The main difference is that this library does not depend on any specific version of RNode nor the schema definition (with minor caveats). RNode version is an input parameter and the goal is to generate JS and TS code for any RNode version.

## Example for Node.js (with web)

Sample static site to test requests from the browser
[https://tgrospic.github.io/rnode-client-js](https://tgrospic.github.io/rnode-client-js). It's published as part of the example repository [@tgrospic/rnode-client-js](https://github.com/tgrospic/rnode-client-js). It also contains protobuf/gRPC examples for Node.js.

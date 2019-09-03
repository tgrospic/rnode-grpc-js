# RNode gRPC API generator

This library helps to generate **JavaScript** bindings for **RNode gRPC** protocol.

Examples of how to use it with **Nodejs** and in the **browser** are in [@tgrospic/rnode-client-js](https://github.com/tgrospic/rnode-client-js) repo.

Example of [Envoy configuration](https://github.com/grpc/grpc-web/blob/952d0f5869b315039a994011ecb5bf57dfdea999/net/grpc/gateway/examples/helloworld/envoy.yaml) to run your own _HTTP/gRPC_ proxy.

#### It contains two parts:
- `rnode-grpc` CLI to generate JS files with **TypeScript definitions**
- helper functions to create **JS client** with **Promise** based **RNode** service methods.

## Install

```sh
npm install @tgrospic/rnode-grpc-js

# For use with Nodejs
npm install grpc

# For use with browser (via Envoy proxy)
npm install grpc-web
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
rnode-grpc --rnode-version v0.9.12 --gen-dir ./rnode-grpc-gen

# Run from your project folder
node_modules/.bin/rnode-grpc
```
We can generate API from not yet published RNode version. E.g. `dev` branch.

```sh
rnode-grpc --rnode-version dev
```
And make requests to new _DeployService_ method `findBlockWithDeploy`. :smile:

```typescript
interface DeployService {
  // Not yet available in v0.9.12 RNode
  findBlockWithDeploy(_: FindDeployInBlockQuery): Promise<BlockQueryResponse>
  // ...existing methods
}
```

## CLI options

| Option             | Default            | Description
| -------------------| ------------------ | ------------
| --rnode-version    | `v0.9.12`          | Version (repo tag) of RNode to generate API.
| --gen-dir          | `./rnode-grpc-gen` | Path to output directory.
| --grpc-web-version | `1.0.6`            | Version of [protoc-gen-grpc-web](https://github.com/grpc/grpc-web/tree/513a578f7f454593c9c238377f56b4c6f4ff04d8/packages/grpc-web#quick-start) _protoc_ plugin.

## API

```typescript
// Get deploy service methods
rnodeDeploy(deployClient, { protoSchema }): DeployService

// Get propose service methods
rnodePropose(proposeClient, { protoSchema }): ProposeService

// Get repl service methods
rnodeRepl(replClient, { protoSchema }): Repl

// Sign deploy data
signDeploy(key: string | Uint8Array | Buffer | ec.KeyPair, deploy: UnsignedDeployData): DeployData

// Verify deploy signature
verifyDeploy(deploy: DeployData): Boolean

// Protobuf serialize / deserialize operations
rnodeProtobuf(protoSchema): TypesBinary
```

### TypeScript definitions

Here is an example of [TypeScript definition file](docs/rnode-grps-js-v0.9.12.d.ts) generated for `v0.9.12` version of RNode.

```sh
# Run CLI command with an option to specify RNode version (Git repo release tag)
rnode-grpc --rnode-version v0.9.12
```
Generated TypeScript definitions are complete with _dynamic_ `Either` type converted to `Promise<T>` type. All the plumbing is done by the library. :smile:

```typescript
// Typescipt generated interface from RNode v0.9.12 protbuf definitions
interface DeployService {
  DoDeploy(_?: DeployData): Promise<DeployServiceResponse>
  getBlock(_?: BlockQuery): Promise<BlockQueryResponse>
  visualizeDag(_?: VisualizeDagQuery): Promise<VisualizeBlocksResponse[]>
  machineVerifiableDag(_?: MachineVerifyQuery): Promise<Unit>
  showMainChain(_?: BlocksQuery): Promise<LightBlockInfo[]>
  getBlocks(_?: BlocksQuery): Promise<LightBlockInfo[]>
  listenForDataAtName(_: DataAtNameQuery): Promise<ListeningNameDataResponse>
  listenForContinuationAtName(_: ContinuationAtNameQuery): Promise<ListeningNameContinuationResponse>
  findBlockWithDeploy(_?: FindDeployInBlockQuery): Promise<BlockQueryResponse>
  findDeploy(_?: FindDeployQuery): Promise<LightBlockQueryResponse>
  previewPrivateNames(_?: PrivateNamePreviewQuery): Promise<PrivateNamePreviewResponse>
  lastFinalizedBlock(_?: LastFinalizedBlockQuery): Promise<BlockQueryResponse>
}
```

### Sample code for how to make requests to RNode in the browser

Code assumes running Envoy proxy to convert gRPC to HTTP requests. At the bottom of the page is the [list of exposed proxies](#available-proxies-for-testnet) to RChain **testnet**.

Working version of this example can be found here [@tgrospic/rnode-client-js/src/web/index.js](https://github.com/tgrospic/rnode-client-js/blob/master/src/web/index.js).

```typescript
/// <reference path="../../rnode-grpc-gen/js/rnode-grps-js.d.ts" />
import { ec } from 'elliptic'
import { rnodeDeploy, rnodePropose, signDeploy, verifyDeploy } from '@tgrospic/rnode-grpc-js'

// Generated files with rnode-grpc-js tool
import { DeployServiceClient } from '../../rnode-grpc-gen/js/DeployService_grpc_web_pb'
import { ProposeServiceClient } from '../../rnode-grpc-gen/js/ProposeService_grpc_web_pb'
import protoSchema from '../../rnode-grpc-gen/js/pbjs_generated.json'

// RNode validator address (or any read-only RNode if we don't use _deploy_ and _propose_)
const rnodeExternalUrl = 'https://testnet-0.grpc.rchain.isotypic.com'

// Instantiate http clients
const deployClient = new DeployServiceClient(rnodeExternalUrl)
const proposeClient = new ProposeServiceClient(rnodeExternalUrl)

// Get RNode service methods
const { getBlocks, DoDeploy } = rnodeDeploy(deployClient, { protoSchema })
const { propose } = rnodePropose(proposeClient, { protoSchema })

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
  phloLimit: 10e3,
}

// Helper function to sign a deploy
// - this can be done when offline and save the signed deploy as JSON
const deploy = signDeploy(key, deployData)

// and to check the signature
const isValidDeploy = verifyDeploy(deploy)

// Send signed deploy to RNode
const { message } = await DoDeploy(deploy)

// Propose deploys to the rest of the network
// - this is usualy done by the validator, on testnet this can be allowed
await propose()
```
#### Protobuf serialize and deserialize operations

```typescript
/// <reference path="../../rnode-grpc-gen/js/rnode-grps-js.d.ts" />
// Generated protobuf files must be loaded to instantiate a global proto object
// needed for `rnodeProtobuf`
require('../../rnode-grpc-gen/js/DeployService_pb')
require('../../rnode-grpc-gen/js/ProposeService_pb')
require('../../rnode-grpc-gen/js/repl_pb')
const protoSchema = require('../../rnode-grpc-gen/js/pbjs_generated.json')

const { rnodeProtobuf } = require('@tgrospic/rnode-grpc-js')

// Get types with serialize and deserialize operations
const { DeployData, CmdRequest } = rnodeProtobuf({ protoSchema })

const deployBytes = DeployData.serialize({ term: 'Nil', phloLimit: 1000 })

const deployObj: DeployData = DeployData.deserialize(deployBytes)
```

## What is the difference with RChain-API?

The main difference is that this library does not depend on any specific version of RNode nor the schema definition (with minor caveats). RNode version is an input parameter and the goal is to generate JS and TS code for any RNode version.

## Available proxies for _testnet_

Sample static site to test requests from the browser
[https://tgrospic.github.io/rnode-client-js](https://tgrospic.github.io/rnode-client-js). It's published as part of the example repository [@tgrospic/rnode-client-js](https://github.com/tgrospic/rnode-client-js).

#### Proxy address pattern:

gRPC `node{0-n}.NETWORK.rchain-dev.tk:40401`  
HTTP `https://NETWORK-{0-n}.grpc.rchain.isotypic.com`

### testnet

| gRPC                              | HTTP
|:---------------------------------:|:-----------------------------------------:
| node0.testnet.rchain-dev.tk:40401 | https://testnet-0.grpc.rchain.isotypic.com
| node1.testnet.rchain-dev.tk:40401 | https://testnet-1.grpc.rchain.isotypic.com
| node2.testnet.rchain-dev.tk:40401 | https://testnet-2.grpc.rchain.isotypic.com
| node3.testnet.rchain-dev.tk:40401 | https://testnet-3.grpc.rchain.isotypic.com
| node4.testnet.rchain-dev.tk:40401 | https://testnet-4.grpc.rchain.isotypic.com
| node5.testnet.rchain-dev.tk:40401 | https://testnet-5.grpc.rchain.isotypic.com
| node6.testnet.rchain-dev.tk:40401 | https://testnet-6.grpc.rchain.isotypic.com
| node7.testnet.rchain-dev.tk:40401 | https://testnet-7.grpc.rchain.isotypic.com
| node8.testnet.rchain-dev.tk:40401 | https://testnet-8.grpc.rchain.isotypic.com
| node9.testnet.rchain-dev.tk:40401 | https://testnet-9.grpc.rchain.isotypic.com

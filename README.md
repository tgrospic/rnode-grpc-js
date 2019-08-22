# RNode gRPC helpers

This library helps to generate **Javascript** bindings for **RNode gRPC**.

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

```sh
# Generate all files with default options
rnode-grpc

# Generate with specific options
rnode-grpc --rnode-version v0.9.12 --gen-dir ./rnode-grpc-gen
```

## What is the difference with RChain-API?

The main difference is that this library does not depend on any specific version of RNode nor the schema definition (with minor caveats). RNode version is an input parameter and the goal is to generate JS code for any RNode version.

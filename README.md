# Serverless Transcription Service

## Info

This handles deployment of microservices with Serverless Framework Stacks using 
Yarn workspaces and Lerna. Dependencies between stacks are maintained with lerna 
through the package dependencies in the package.json files. Stacks are deployed 
in parallel, maintaining the dependencies order.

To minimize the number of S3 buckets created, all services use the same deployment 
bucket from the common service.

This covers...
- stack management stacks
- common code sharing between stacks stacks/common
- common config sharing between stacks stacks/config
- dependency management (reduce duplicate) using Yarn Workspaces
- using Esbuild for speeding up the development
- using Jest for testing
- using ts-jest for test transpilation

...other good practices:
- logging objects using JSON
- source maps using native Node feature
- the least privilege access by using Serverless plugin
- using modern ES2020 constructs
- using Lerna dependency tree for deployment in the right order


## Project Dependencies

This project uses...
- [yarn](https://classic.yarnpkg.com/lang/en/) (v1.22.13) Dependency management.

- [lerna](https://lerna.js.org/) (v4.0.0) Multipackage (monorepo) management.

- [serverless framework](https://www.serverless.com/) (v2.62.0) Deployment tooling. 

- [typescript](https://www.typescriptlang.org/) (v4.4.3) Scripting language. 

- [jest](https://jestjs.io/) (v26.6.3) Testing.


## File Structure
```
└─ services/
    ├─ config/                  - config for services
    └─ common/                  - common resources for services
    └─ audio-store/             - deploys cloudformation stack
    └─ transcribe/              - deploys cloudformation stack
    └─ config.yml               - common configuration for services
```

## Development

### Install:
```
yarn install
```

### Check Types & Lint:
```
yarn run lint && yarn run checktsc
```

### Run Tests:
```
yarn run test
```
*To test individual service, run **yarn test** from its directory.*

### Deploy:
```
yarn run deploy
```
*To deploy individual service, run **yarn deploy** from its directory.*

### Remove:
```
yarn run remove
```
*To remove individual service, run **yarn run remove** from its directory.*

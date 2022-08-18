# Serverless Transcription Service

## Info

This handles the deployment for a transcription service. This works by

- Uploading an mp3 file to an s3 bucket
- Lambda triggered by S3 bucket object uploads, sends file to AWS Transcribe
- On Transcription Job Completion, Transcribe sends output to another S3 bucket
- Another Lambda triggered by S3 bucket object uploads, process text from transcription

## Architecture

<p align="center">
  <img src="/architecture-diagram.drawio.svg" />
</p>


## Project Dependencies

This project uses...
- [yarn](https://classic.yarnpkg.com/lang/en/) (v1.22.13) Dependency management.
- [lerna](https://lerna.js.org/) (v4.0.0) Multipackage (monorepo) management.
- [serverless framework](https://www.serverless.com/) (v3.21.0) Deployment tooling. 
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

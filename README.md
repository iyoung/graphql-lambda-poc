# Typescript simple lambda template

A template for a simple Typescript AWS Lambda with all the recommended tooling for linting testing and version management

## Tech

* [typeScript] - TypeScript is a typed superset of JavaScript
* [node.js] - Evented I/O for the backend
* [jest] - Mocking/testing framework
* [nvm] - Node Version Manager

## Installation

You need [node.js] installed globally to run the app. We recommend you manage your Node versions with [nvm].

### nvmrc

You need [node.js] installed to run the service. It is recommended that you use [nvm] for managing the complexity of
Node versions.  Using nvm, run:

```bash
nvm use
```

This will select the appropriate version of the Node installed on your machine upon the .nvmrc file.

Then to install the dependencies:

```bash
npm install
```

To install the dependencies specified by `package-lock.json`:

```bash
npm ci
```

## Lint

A default [typescript] style lint (tslint.json) has been included in this build. To ensure that the TS files conform to
the lint, run:

```bash
npm run lint
```

Additionally the package.json can be linted by running

```bash
npm run lint:package
```

Commit messages themselves are linted and Husky enforces this an example of an acceptable commit message would be

```bash
feat(initial): create ts lambda adapter template IAI-3790

Initial commit including linting, testing, ci, and a skeleton structure for a NestJS AWS Lambda which utilises RXJS

[IAI-3790](https://press-association.atlassian.net/browse/IAI-3790)
```

## Git hooks

In order to set up git hooks for development, please run ```npx husky install``` after installing the dependencies

## Unit Tests

Tests are run using the [jest] framework and include a coverage check as default.
They can be executed by running

```bash
npm run test
```

### Semantic Release - Commit style

It is recommended for clarity that the ticket reference is included in the commit message body, the format should be as follows:

`fix|feat|perf(<short_feature_name>): <ticket> - <description_of_change>`

Here is an example of the release type that will be done based on a commit messages.

| Commit message  | Release type               |
|-----------------|----------------------------|
| `fix(logging): TICKET-1234 - Additional logging`  | Patch Release |
| `feat(publish-endpoint): TICKET-2345 - Addition of the /publish endpoint to the API` | ~~Minor~~ Feature Release  |
| `perf(event-model): TICKET-3456 - Event model update`<br><br>`BREAKING CHANGE: The time attribute has been removed.` | ~~Major~~ Breaking Release |

[typeScript]:https://www.typescriptlang.org/
[jest]:https://jestjs.io/
[node.js]:https://nodejs.org
[nvm]:https://github.com/creationix/nvm

### Continuous Deployment

In order to deploy to AWS this repository requires IAM credentials to be configured as repository secrets namely: -

* AWS_ACCESS_KEY_ID
* AWS_SECRET_ACCESS_KEY

The account used should have the minimum required permissions to deploy the lambda and associate it with any essential infrastructure.

This template has configuration which would deploy to staging upon a merge to main, to deploy through to production add additional jobs.

If continuous deployment is not required the deploy job in the release workflow should be removed.

## Serverless

If you use `~/.aws/config` for the aws profile being used and want the config applied you will need to set/export `AWS_SDK_LOAD_CONFIG=true`

### Local Github Action Invocation

You can use [act](https://github.com/nektos/act#overview---) to run the CI jobs locally like this:

```sh
act -j deploy -P ubuntu-18.04=nektos/act-environments-ubuntu:18.04 -s SEMVER_TOKEN=something -s AWS_ACCESS_KEY_ID=something -s AWS_SECRET_ACCESS_KEY=something
```

Act seems to have trouble with the if syntax in the release job, so if you are debugging an issue in an action you may want to comment this bit out temporarily.

### Deployment

Serverless is used to deploy the lambda.

> **CAUTION**: This will deploy to production if you have credentials/permissions and specify the production env

```sh
sls deploy --env <environment>
```

This uses the config from [deploy/config/\<environment>.yaml](deploy/config/)

### Teardown

```sh
sls remove --env <environment>
```

### Configuration

Environment configuration files can be found in [deploy/config/](deploy/config/)
The environment config set with `--env <environment>` is then loaded in to the self:custom.env variable in [serverless.yaml](serverless.yaml)

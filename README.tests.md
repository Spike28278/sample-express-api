# Testing
>Note: All tests are run with `npm run test`, this is also run as a pre-commit git-hook which can be found [here](.husky/pre-commit)

## Table of contents

- [Jest](#jest)

## Jest

### Running Tests
This project uses Jest as a testing library, to run the tests please follow these steps:

* If you haven't already you'll need to run `npm install`
* If you need to run jest in watch mode then run `npm run jest:watch`, otherwise all tests can be run with `npm run test`

>If you need to add additional Jest tests ensure the file name contains either `.spec` or `.test`

### Configuring Jest
There are 2 files for configuring jest:
- [jest.config.js](jest.config.js)
- [jest.setup.ts](jest.setup.ts)

#### jest.config.js
Used for global configuration of jest, alternatively this can be configured in the `package.json` file
 
Please see [Jest Config Doc](https://jestjs.io/docs/configuration) for more info

#### jest.setup.ts
Used for running code before each jest test file is executed. This file is referenced in [jest.config.js](jest.config.js) under the `setupFilesAfterEnv` config option
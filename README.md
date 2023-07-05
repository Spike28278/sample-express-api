# Express-api

## Table of contents

- [Install & run](#install--run)
- [API](#api)
- [jest](README.tests.md)
- [husky](README.husky.md)
- [eslint](README.eslint.md)

## Install & run

First you'll need to install

>npm install

Next create a `.env` file in the project root and populate it with the following:

_(don't include '<' or '>')_
```
PORT=<port-number-here>
BASE_PATH=<base-path-here>
```
>Note: If some or all of their values are not supplied, or if a .env file does not exist, default values will be used.

>Note: The JWT middleware included in this container needs to be registered with express as middleware if needed, by default it this is not applied.

Finally, you'll just need to run the application in either development or production mode:

###Dev:

In development mode:
- Nodemon is used for watching for changes and automatically restarting after changes have been applied.
- Node --inspect switch is used for listening for a debugging client, by default this will listen on `127.0.0.1:9229`. You'll be able to attach your ide's debugger to already running code or configure a run/debug configuration for your ide and start the debugger with your code. View the links below for your specific ide:

  - IntelliJ: https://www.jetbrains.com/help/idea/running-and-debugging-node-js.html
  - VSCode: https://code.visualstudio.com/docs/nodejs/nodejs-debugging

>npm run start:dev

###Prod:
In production mode:
- Transpiled JavaScript will be run from the `outDir` specified in the `tsconfig.json` file. 
>Note: Running in production locally may require you to run `npm run compile` as this will transpile the TypeScript code in to JavaScript.

> npm run start
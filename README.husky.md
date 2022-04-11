# Husky
This project uses husky to create and manage git-hooks.

To add a new git-hook:
- If you haven't already you'll need to run `npm install`
- Run `npx husky ass .husky/<git-hook> "<npm command>"`
    - i.e: This will add a pre-commit git-hook for running tests: `npx husky add .husky/pre-commit "npm run test"`

These files are created in the [.husky](.husky) directory.
>Note: The folder named '_' and it's contents are generated and ignored by husky. These will be created when `npm install` runs.


Please see [Husky](https://typicode.github.io/husky/#/) for more info

Please see [Git-Hooks Docs](https://git-scm.com/docs/githooks#_hooks) for more info
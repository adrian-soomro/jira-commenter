# Description

An Azure DevOps build extension that will comment on your JIRA tickets for you.

To learn a bit more about the extension and how to use it, check out the [overview](./overview.md).

## Prerequisites

To get up and running, install these dependencies

- [tsc](https://www.typescriptlang.org/download) global install is required for packaging and publishing a never version of this extension
- [nodejs v10 & npm v6](https://github.com/nvm-sh/nvm) as the pipeline agents support version 10
- [tfx-cli](https://docs.microsoft.com/en-us/azure/devops/extend/publish/command-line?view=azure-devops#acquire-the-cross-platform-cli-for-azure-devops) for creating and publishing the extension

## Install npm dependencies

`npm i` to install all dependencies

## Run Unit tests

`npm t` to run all unit tests

## Packaging

To package the extension and prepare it for being published, execute the `package.sh` script

```sh
./buildandreleasetask/scripts/package.sh
```

## Publishing

To publish the packaged extension, execute the `publish.sh` script, passing in your Personal Access Token

```sh
./buildandreleasetask/scripts/publish.sh "${PAT}"
```

where `${PAT}` needs to be substituted for your Personal Access Token

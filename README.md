gitsync
=======



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/gitsync.svg)](https://npmjs.org/package/gitsync)
[![Downloads/week](https://img.shields.io/npm/dw/gitsync.svg)](https://npmjs.org/package/gitsync)
[![License](https://img.shields.io/npm/l/gitsync.svg)](https://github.com/mikister/gitsync/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g gitsync
$ gitsync COMMAND
running command...
$ gitsync (-v|--version|version)
gitsync/0.0.1 linux-x64 node-v14.4.0
$ gitsync --help [COMMAND]
USAGE
  $ gitsync COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`gitsync add [NAME]`](#gitsync-add-name)
* [`gitsync hello [FILE]`](#gitsync-hello-file)
* [`gitsync help [COMMAND]`](#gitsync-help-command)

## `gitsync add [NAME]`

```
USAGE
  $ gitsync add [NAME]

OPTIONS
  -h, --help     show CLI help
  -v, --verbose

EXAMPLE
  $ gitsync add parent_folder/repo_name
```

_See code: [src/commands/add.ts](https://github.com/mikister/gitsync/blob/v0.0.1/src/commands/add.ts)_

## `gitsync hello [FILE]`

```
USAGE
  $ gitsync hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ gitsync hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/mikister/gitsync/blob/v0.0.1/src/commands/hello.ts)_

## `gitsync help [COMMAND]`

```
USAGE
  $ gitsync help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.0/src/commands/help.ts)_
<!-- commandsstop -->

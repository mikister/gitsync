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
$ npm install -g @mikister/gitsync
$ gitsync COMMAND
running command...
$ gitsync (-v|--version|version)
@mikister/gitsync/0.0.1 linux-x64 node-v14.4.0
$ gitsync --help [COMMAND]
USAGE
  $ gitsync COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`gitsync add [NAME]`](#gitsync-add-name)
* [`gitsync check [PATH]`](#gitsync-check-path)
* [`gitsync config SUBCOMMAND [VALUE]`](#gitsync-config-subcommand-value)
* [`gitsync hello [FILE]`](#gitsync-hello-file)
* [`gitsync help [COMMAND]`](#gitsync-help-command)
* [`gitsync list`](#gitsync-list)
* [`gitsync track [REPO] [PATH]`](#gitsync-track-repo-path)

## `gitsync add [NAME]`

```
USAGE
  $ gitsync add [NAME]

OPTIONS
  -h, --help     show CLI help
  -v, --verbose

EXAMPLE
  $ gitsync add parent_folder/repo_name
  creating repo repo_name in /path/to/homedir/projects/parent_folder
```

_See code: [src/commands/add.ts](https://github.com/mikister/gitsync/blob/v0.0.1/src/commands/add.ts)_

## `gitsync check [PATH]`

```
USAGE
  $ gitsync check [PATH]

OPTIONS
  -h, --help  show CLI help

EXAMPLE
  $ gitsync check
  checking all repos
```

_See code: [src/commands/check.ts](https://github.com/mikister/gitsync/blob/v0.0.1/src/commands/check.ts)_

## `gitsync config SUBCOMMAND [VALUE]`

```
USAGE
  $ gitsync config SUBCOMMAND [VALUE]

OPTIONS
  -h, --help     show CLI help
  -v, --verbose

EXAMPLE
  $ gitsync edit projectsHome=~/newProjectsHome
  > Set projectsHome to /home/<user>/newProjectsHome

  $ gitsync list
  > Listing all config options

  $ gitsync setup
  > Creating a default gitsync config
```

_See code: [src/commands/config.ts](https://github.com/mikister/gitsync/blob/v0.0.1/src/commands/config.ts)_

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

## `gitsync list`

```
USAGE
  $ gitsync list

OPTIONS
  -h, --help  show CLI help

EXAMPLE
  $ gitsync list
  repo 1
  repo 2
```

_See code: [src/commands/list.ts](https://github.com/mikister/gitsync/blob/v0.0.1/src/commands/list.ts)_

## `gitsync track [REPO] [PATH]`

```
USAGE
  $ gitsync track [REPO] [PATH]

OPTIONS
  -h, --help     show CLI help
  -v, --verbose

EXAMPLE
  $ gitsync track owner/repo path/where/to/track
  tracking owner/repo in path/where/to/track
```

_See code: [src/commands/track.ts](https://github.com/mikister/gitsync/blob/v0.0.1/src/commands/track.ts)_
<!-- commandsstop -->

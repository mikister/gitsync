import { Command, flags } from "@oclif/command"
import { exists as configExists, generateConfig } from "../utils/config"
import { printLog } from "../utils/logging"

export default class Config extends Command {
  static description = "Edit gitsync configurations"

  static examples = [
    `$ gitsync hello
hello world from ./src/hello.ts!
`,
  ]

  static flags = {
    help: flags.help({ char: "h" }),
    verbose: flags.boolean({ char: "v" }),
  }

  static args = [
    { name: "subcommand", required: true, options: ["edit", "list", "setup"] },
    { name: "value", required: false },
  ]

  async run() {
    const { args, flags } = this.parse(Config)

    let logs: Log[] = []

    if (!configExists() && args.subcommand !== "setup") {
      this.log("config does not exist")
      this.log('try running "gitsync config setup" to generate the config')
      return
    } else if (configExists() && args.subcommand === "setup") {
      this.log("config already exists")
      return
    }

    switch (args.subcommand) {
      case "edit":
        break
      case "list":
        break
      case "setup":
        await generateConfig()
          .then((lls: Log[]) => {
            logs = [...logs, ...lls]
          })
          .catch(printLog)
        break
    }

    if (flags.verbose) {
      logs.forEach(printLog)
    }
  }
}

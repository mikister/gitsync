import { Command, flags } from "@oclif/command"
import {
  exists as configExists,
  generateConfig,
  getConfig,
} from "../utils/config"
import { printLog } from "../utils/logging"
import { Config as ConfigModel, Log } from "../model"

export default class Config extends Command {
  static description = "Edit gitsync configurations"

  static examples = [
    `$ gitsync edit projectsHome=~/newProjectsHome
> Set projectsHome to /home/<user>/newProjectsHome

$ gitsync list
> Listing all config options

$ gitsync setup
> Creating a default gitsync config
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
    }
    if (configExists() && args.subcommand === "setup") {
      this.log("config already exists")
      return
    }

    switch (args.subcommand) {
      case "edit":
        break
      case "list":
        this.log("Listing all config options:")
        const config: ConfigModel = getConfig()

        Object.entries(config).forEach((option) => {
          const [name, value] = option
          this.log(` - ${name}: ${value}`)
        })
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

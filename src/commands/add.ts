import { Command, flags } from "@oclif/command"
import { mkdir } from "../node_bindings/bash"
import { repoCreate } from "../node_bindings/gh"
import { gitInit, gitRemoteAdd } from "../node_bindings/git"
import { printLog } from "../utils/logging"

export default class Add extends Command {
  static description = "Adds a new repo"

  static examples = [
    `$ gitsync add parent_folder/repo_name
`,
  ]

  static flags = {
    help: flags.help({ char: "h" }),
    verbose: flags.boolean({ char: "v" }),
  }

  static args = [{ name: "name" }]

  async run() {
    const { args, flags } = this.parse(Add)

    const logs: Log[] = []

    let location = "/home/milan/projects/test/"
    let name = args.name
    if (name.includes("/")) {
      const temp = name.split("/")
      name = temp[temp.length - 1]
      location += temp.slice(0, temp.length - 1).join("/")
    }

    this.log(`creating repo ${name} in /home/milan/projects/test/${location}`)

    await mkdir(`${location}/${name}`)
      .then((log: Log) => logs.push(log))
      .catch(printLog)

    await repoCreate("mikister", name, true, {
      cwd: location,
    })
      .then((log: Log) => logs.push(log))
      .catch(printLog)

    await gitInit({
      cwd: `${location}/${name}`,
    })
      .then((log: Log) => logs.push(log))
      .catch(printLog)

    await gitRemoteAdd("origin", `git@github.com:mikister/${name}.git`, {
      cwd: `${location}/${name}`,
    })
      .then((log: Log) => logs.push(log))
      .catch(printLog)

    if (flags.verbose) {
      logs.forEach(printLog)
    }
  }
}

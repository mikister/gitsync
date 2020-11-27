import { Command, flags } from "@oclif/command"
import * as path from "path"
import { mkdir } from "../node_bindings/bash"
import { repoClone } from "../node_bindings/gh"
import { printLog } from "../utils/logging"

export default class Track extends Command {
  static description = "describe the command here"

  static examples = [
    `$ gitsync track owner/repo
tracking owner/repo
`,
  ]

  static flags = {
    help: flags.help({ char: "h" }),
    directory: flags.string({
      char: "d",
      description:
        "sub-directory within projects folder where to track the repo",
    }),
    verbose: flags.boolean({ char: "v" }),
  }

  static args = [{ name: "repo" }]

  async run() {
    const { args, flags } = this.parse(Track)

    let logs: Log[] = []

    let location = "/home/milan/projects/test/"
    const [owner, repo] = args.repo.split("/")
    this.log(`tracking ${owner}/${repo}`)
    console.log(args.repo)

    location = path.join(location, flags.directory || "")

    await mkdir(location)
      .then((log: Log) => logs.push(log))
      .catch(printLog)

    await repoClone(`${owner}/${repo}`, {
      cwd: location,
    })
      .then((log: Log) => logs.push(log))
      .catch(printLog)

    if (flags.verbose) {
      logs.forEach(printLog)
    }
  }
}

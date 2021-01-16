import { Command, flags } from "@oclif/command"
import * as path from "path"
import { mkdir } from "../node_bindings/bash"
import { repoClone } from "../node_bindings/gh"
import { printLog } from "../utils/logging"
import { Config, Log } from "../model"
import { getConfig } from "../utils/config"

export default class Track extends Command {
  static description = "Track remote repos locally"

  static examples = [
    `$ gitsync track owner/repo path/where/to/track
tracking owner/repo in path/where/to/track
`,
  ]

  static flags = {
    help: flags.help({ char: "h" }),
    // directory: flags.string({
    //   char: "d",
    //   description:
    //     "sub-directory within projects folder where to track the repo",
    // }),
    verbose: flags.boolean({ char: "v" }),
  }

  static args = [{ name: "repo" }, { name: "path" }]

  async run() {
    const { args, flags } = this.parse(Track)
    const CONFIG: Config = getConfig()

    const logs: Log[] = []

    const [owner, repo] = args.repo.split("/")
    const repoPath = path.join(CONFIG.projectsHome, args.path)
    this.log(`tracking ${owner}/${repo} in ${repoPath}`)

    await mkdir(repoPath)
      .then((log: Log) => logs.push(log))
      .catch(printLog)

    await repoClone(`${owner}/${repo}`, {
      cwd: repoPath,
    })
      .then((log: Log) => logs.push(log))
      .catch(printLog)

    if (flags.verbose) {
      logs.forEach(printLog)
    }
  }
}

import { Command, flags } from "@oclif/command"
import { getRepoList } from "../utils"

export default class List extends Command {
  static description = "describe the command here"

  static examples = [
    `$ gitsync list
repo 1
repo 2
`,
  ]

  static flags = {
    help: flags.help({ char: "h" }),
  }

  static args = []

  async run() {
    // const { args, flags } = this.parse(List)

    const repos: string[] = (await getRepoList()) as string[]

    repos
      .sort((aa, bb) => (aa < bb ? -1 : 1))
      .forEach((repo) => {
        this.log(`${repo}`)
      })
  }
}

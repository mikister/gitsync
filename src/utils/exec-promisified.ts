const { exec } = require("child_process")

export function execp(
  command: string,
  options: Record<string, any> = {}
): Promise<Log> {
  return new Promise((resolve, reject) => {
    exec(command, options, (error: any, stdout: any, stderr: any) => {
      if (error) {
        reject({
          type: "error",
          message: error.message,
          error,
          command,
          options,
        } as Log)
        return
      }
      if (stderr) {
        reject({
          type: "stderr",
          message: stderr,
          error: stderr,
          command,
          options,
        } as Log)
        return
      }

      resolve({
        type: "stdout",
        message: stdout,
        command,
        options,
      } as Log)
    })
  })
}

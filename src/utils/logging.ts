export function printLog(log: Log) {
  /* eslint-disable no-console */
  console.log(log.type)
  console.log(`Command: ${log.command}`)
  if (log.options) console.log(`Options: ${JSON.stringify(log.options)}`)
  console.log(log.message)
  if (log.error) console.error(log.error)
}

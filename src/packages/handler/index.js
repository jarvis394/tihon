const cluster = require('cluster')
const handleError = require('../../utils/handleError')
const { commandsQueue: queue } = require('../../globals')

cluster.worker.on('message', async ({ isCommand }) => {
  if (!isCommand) return

  const update = queue.shift()
  console.log(process.pid, update, queue.isEmpty)

  // Destructure state
  /*const { command: cmd, arguments: args } = update.state

  try {
    const command = require(`../../commands/${cmd.group}/${cmd.name}`)
    const response = await command.run({ update, args })
    
    await update.reply(response)
    return cluster.worker.send({ busy: false })
  } catch (e) {
    if (e.code === 'MODULE_NOT_FOUND') return
    else return handleError(update, e)
  }*/
})

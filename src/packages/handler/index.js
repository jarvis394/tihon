const cluster = require('cluster')
const handleError = require('../../utils/handleError')

cluster.worker.on('executeCommand', async update => {
  // Set worker state as working
  cluster.worker.emit('working')

  // Destruct state
  const { command: cmd, arguments: args } = update.state

  try {
    const command = require(`../../commands/${cmd.group}/${cmd.name}`)
    const response = await command.run({ update, args })
    
    return await update.reply(response)
  } catch (e) {
    if (e.code === 'MODULE_NOT_FOUND') return
    else handleError(update, e)
  }
})

const cluster = require('cluster')
const handleError = require('../../utils/handleError')
const { vk } = require('../../globals')
const { MessageContext } = require('vk-io')

cluster.worker.on('message', async ({ isCommand, update, state }) => {
  if (!isCommand) return 

  const u = new MessageContext(vk, update, {})
  
  // Destructure state
  const { command: cmd, arguments: args } = state

  try {
    const command = require(`../../commands/${cmd.group}/${cmd.name}`)
    const response = await command.run({ u, args })
    
    await u.reply(response)
    return cluster.worker.send({ busy: false })
  } catch (e) {
    if (e.code === 'MODULE_NOT_FOUND') return
    else return handleError(u, e)
  }
})

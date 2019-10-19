const cluster = require('cluster')
const handleError = require('../../utils/handleError')
const { vk } = require('../../globals')
const { MessageContext } = require('vk-io')

cluster.worker.on('message', async ({ isCommand, update: payload, state }) => {
  if (!isCommand) return

  const update = new MessageContext(vk, payload, {})

  // Destructure state
  const { command: cmd, arguments: args } = state

  try {
    const command = require(`../../commands/${cmd.group}/${cmd.name}`)
    const response = await command.run({ update, args })

    await update.reply(response)
    return cluster.worker.send({ busy: false })
  } catch (e) {
    if (e.code === 'MODULE_NOT_FOUND') return
    else return handleError(update, e)
  }
})

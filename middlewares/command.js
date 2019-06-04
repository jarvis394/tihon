const {
  prefix
} = require('../config')
const {
  handleError
} = require('../utils')
const {
  randomStorage,
  commands,
  api,
  updates,
  vk
} = require('../variables')

updates.on('message', async (update, next) => {
  let text = update.text,
    args, cmd

  if (update.state.mentioned) {
    text = update.text
    args = text.split(' ')
    args.shift()
  } else {
    text = update.text
    args = text.slice(prefix.length).trim().split(' ')
  }

  if (update.hasForwards || update.hasAttachments()) {
    await update.loadMessagePayload()
  }

  let cName = args.shift()
  commands.forEach(c => {
    if (c.name === cName || (c.alias && c.alias.some(e => cName.startsWith(e)))) return cmd = c
  })

  if (cName.startsWith('?dev')) {
    cmd = {
      name: cName.slice(5),
      group: 'dev'
    }
  }
  if (!cmd) return

  try {
    let commandFile = require(`../commands/${cmd.group}/${cmd.name}.js`)
    commandFile.run(api, update, args, randomStorage, vk, commands)
  } catch (e) {
    if (e.code === 'MODULE_NOT_FOUND') return
    handleError(update, e)
  }

  await next()
})
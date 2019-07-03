const { ADMIN_ONLY, ADMINS } = require('../configs/admins')
const { PREFIX } = require('../configs/constants')
const handleError = require('../utils/handleError')
const { randomStorage, commands, api, updates, vk } = require('../variables')

updates.on('message', async (update, next) => {
  function isAdmin() {
    return ADMINS.some(id => id.toString() === update.senderId.toString())
  }

  let text = update.text,
    args,
    cmd

  if (ADMIN_ONLY && !isAdmin()) return

  if (update.state.mentioned) {
    text = update.text
    args = text.split(' ')
    args.shift()
  } else {
    text = update.text
    args = text
      .slice(PREFIX.length)
      .trim()
      .split(' ')
  }

  args = args.map(a => a.trim()).filter(a => a.length !== 0)

  if (update.hasForwards || update.hasAttachments()) {
    await update.loadMessagePayload()
  }

  let cName = args.shift()
  commands.forEach(c => {
    if (c.name === cName || (c.alias && c.alias.some(e => cName.startsWith(e))))
      return (cmd = c)
  })

  if (cName.startsWith('?dev')) {
    if (!isAdmin()) return

    cmd = {
      name: cName.slice(5),
      group: 'dev'
    }
  }
  if (!cmd) return

  try {
    let commandFile = require(`../commands/${cmd.group}/${cmd.name}.js`)
    commandFile.run(
      api,
      update,
      args,
      randomStorage,
      vk,
      commands,
      require('../variables')
    )
  } catch (e) {
    if (e.code === 'MODULE_NOT_FOUND') return await next()
    handleError(update, e)
  }

  await next()
})

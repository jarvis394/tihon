const handleError = require('../utils/handleError')

module.exports = async update => {
  const { command, arguments: args } = update.state
  const callback = error => {}

  try {
    let cmd = require(`../commands/${command.group}/${command.name}`)
    await cmd.run({ update, args, callback })
  } catch (e) {
    if (e.code === 'MODULE_NOT_FOUND') return
    else handleError(update, e)
  }
}

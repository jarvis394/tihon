const handleError = require('../utils/handleError')
const { randomStorage, commands, api, vk } = require('../variables')

module.exports = async update => {
  const { command, arguments: args } = update.state

  try {
    let cmd = require(`../commands/${command.group}/${command.name}`)
    cmd.run(
      api,
      update,
      args,
      randomStorage,
      vk,
      commands,
      require('../variables')
    )
  } catch (e) {
    if (e.code === 'MODULE_NOT_FOUND') return 
    handleError(update, e)
  }
}

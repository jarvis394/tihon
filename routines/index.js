const init = require('./init')
const commands = require('./parseCommands')

require('./flushTemp')
require('./logging')

module.exports = {
  ...init,
  commands
}

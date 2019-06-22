const init = require('./init')
const commands = require('./parseCommands')
const log = require('./logging')

require('./flushTemp')(log)

module.exports = {
  ...init,
  commands,
  log
}

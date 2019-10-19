const events = require('../../../lib/structures/Events')

module.exports = update => {
  return events.emit('executeCommand', update)
}

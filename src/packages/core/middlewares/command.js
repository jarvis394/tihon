const events = require('../../../lib/Events')

module.exports = update => {
  return events.emit('executeCommand', update)
}

const events = require('../../lib/structures/Events')
const chalk = require('chalk')
const dialogs = require('./dialogs')
const messages = require('./messages')
const { DATA_GET_INTERVAL } = require('../../configs/constants')
const log = require('../../loaders/log')

events.on('getDialogsSuccess', () => messages())
events.on('getMessagesSuccess', () => events.emit('load'))

setInterval(() => run(), DATA_GET_INTERVAL)

// Get dialogs
run()

function run() {
  log.info(chalk.gray('Getting data...'))
  dialogs()
}

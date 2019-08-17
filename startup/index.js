/**
 * This file executes right before the app starts
 * It initializes all variables and also starts logging services, etc.
 */

const init = require('./init')
const commands = require('./parseCommands')
const log = require('./log')

// Flush temporary data to DB
require('./flushTemp')

module.exports = {
  ...init,
  commands,
  log
}

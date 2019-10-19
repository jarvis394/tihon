/**
 * This file executes right before the app starts
 * It initializes all globals and also starts logging services, etc.
 */

const init = require('./init')
const commands = require('./parseCommands')
const log = require('./log')

module.exports = {
  ...init,
  commands,
  log,
}

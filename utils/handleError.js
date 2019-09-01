/**
 * Handles error
 * @param {object} update Update object
 * @param {object} e Error object
 */
module.exports = (update, e) => {
  const { log } = require('../variables')

  !e.isCommandError && log.error(e)
  
  update.reply((e.emoji ? e.emoji : '🔻') + ' ' + e.message)
}

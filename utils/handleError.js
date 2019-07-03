const { log } = require('../variables')

/**
 * Handles error
 * @param {object} update Update object
 * @param {object} e Error object
 */
module.exports = (update, e) => {
  log.error(e)

  process.env.MODE === 'PRODUCTION' &&
    update.send('АШИБКА РИП. \n❌ ' + e.stack.split(' ')[0] + ' ' + e.message)
}

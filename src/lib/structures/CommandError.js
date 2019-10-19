const emojiRegex = require('emoji-regex')()

/**
 * Format for 'code' field:
 * <ErrorDesc> or <Type>_<ErrorDesc>
 *
 * e.g. NoField
 * e.g. Argument_MissingField
 */

class CommandError extends Error {
  constructor(message, code = 'UnexpectedError') {
    message = message.trim()

    super(message)

    const state = emojiRegex.exec(message)
    this.message = message
    this.emoji = state ? state[0] : null
    this.isCommandError = true
    this.code = code
    this.description = code.includes('_') ? code.split('_')[1] : code
    this.type = code.includes('_') ? code.split('_')[0] : null
  }
}

module.exports = CommandError

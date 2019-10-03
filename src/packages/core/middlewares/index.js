const { updates } = require('../../../globals')
const mention = require('./mention')
const command = require('./command')
const log = require('./log')

// Count message
require('./counter')

// Add coin
require('./coins')

// Filter message
require('./filter')

// Set message payload
require('./payload')

// Set session
require('./session')

// Filter blacklisted users and multidialogs
require('./blacklist')

// Filter by timeout
require('./timeout')

updates.on('message', async (update, next) => {
  // If message is only mention
  // then return mention message
  if (update.state.isMentionMessage) {
    return mention(update)
  }

  // Else if message is command
  // log it and run the command
  else if (update.state.isCommand) {
    log(update)
    return command(update)
  }

  // Process middlewares
  await next()
})

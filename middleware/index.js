const { updates } = require('../variables')
const counter = require('./counter')
const filter = require('./filter')
const payload = require('./payload')
const mention = require('./mention')
const command = require('./command')
const log = require('./log')

updates.on('message', async (update, next) => {

  // Count message
  counter(update)

  // Filter message
  filter(update)

  // Set message payload
  payload(update)

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

  // Process listeners
  await next()

})

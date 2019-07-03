const { PREFIX, MENTION_PREFIX } = require('../configs/constants')
const { commands } = require('../variables')
const isAdmin = require('../utils/isAdmin')

module.exports = async update => {
  const { message, senderId, state } = update
  let msg = message

  if (message.startsWith(MENTION_PREFIX)) {
    state.isMentioned = true
  } else if (message.startsWith(PREFIX)) {
    state.isCommand = true
  } else return

  if (update.hasForwards || update.hasAttachments()) {
    await update.loadMessagePayload()
  }

  if (state.isMentioned) {
    msg = message
      .split(' ')
      .slice(1)
      .join(' ')
  }

  state.commandText = msg.split(' ').shift()
  state.arguments = msg
    .slice(PREFIX.length)
    .trim()
    .split(' ')

  state.arguments = state.arguments
    .map(a => a.trim())
    .filter(a => a.length !== 0)

  if (state.commandText.startsWith('?dev')) {
    if (isAdmin(senderId)) {
      state.command = {
        name: state.commandText.slice(5),
        group: 'dev'
      }
    } else return
  } else {
    commands.forEach(c => {
      if (
        c.name === state.commandText ||
        (c.alias && c.alias.some(e => state.commandText.startsWith(e)))
      )
        return (state.command = c)
    })
  }

  if (!state.command) return
}

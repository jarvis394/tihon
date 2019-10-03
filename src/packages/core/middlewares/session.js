const { COMMAND_COOLDOWN } = require('../../../configs/constants')
const { updates, memoryStorage, talkedRecently } = require('../../../globals')

updates.on('message', async (update, next) => {
  const { peerId, senderId, state } = update

  if (state.isCommand) {
    // Return if user has used command recently
    if (talkedRecently.has(senderId)) return

    // Add user to a Set
    talkedRecently.add(senderId)
    setTimeout(() => talkedRecently.delete(senderId), COMMAND_COOLDOWN)
  }

  // Get session
  const session = memoryStorage.has(peerId) ? memoryStorage.get(peerId) : {}
  update.state.session = session

  // Set session to the storage
  memoryStorage.set(peerId, session)

  await next()
})

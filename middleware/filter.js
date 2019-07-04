const { ADMIN_ONLY } = require('../configs/admins')
const { COMMAND_COOLDOWN } = require('../configs/constants')
const { updates, memoryStorage, talkedRecently } = require('../variables')
const isAdmin = require('../utils/isAdmin')

updates.on('message', async (update, next) => {
  const { text, isOutbox, peerId, senderId } = update

  if (isOutbox) return
  if (text === '' || !text) return
  if (ADMIN_ONLY && !isAdmin(senderId)) return

  // Return if user has used command recently
  if (talkedRecently.has(senderId)) return

  // Add user to a Set
  talkedRecently.add(senderId)
  setTimeout(() => talkedRecently.delete(senderId), COMMAND_COOLDOWN)

  // Get session
  let session = memoryStorage.has(peerId) ? memoryStorage.get(peerId) : {}
  update.state.session = session

  // Set session to the storage
  memoryStorage.set(peerId, session)

  await next()
})

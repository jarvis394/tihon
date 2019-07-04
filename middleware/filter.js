const { ADMIN_ONLY } = require('../configs/admins')
const { updates } = require('../variables')
const isAdmin = require('../utils/isAdmin')

updates.on('message', async (update, next) => {
  const { text, isOutbox, peerId, senderId } = update

  if (isOutbox) return
  if (text === '' || !text) return
  if (ADMIN_ONLY && !isAdmin(senderId)) return

  await next()
})

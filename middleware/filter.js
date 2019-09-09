const { ADMIN_ONLY, EXCLUDE_ADMINS } = require('../configs/admins')
const { updates } = require('../variables')
const isAdmin = require('../utils/isAdmin')

updates.on('message', async (update, next) => {
  const { text, isOutbox, senderId } = update

  if (isOutbox) return
  if (text === '' || !text) return
  if (senderId < 0) return
  if (ADMIN_ONLY && !isAdmin(senderId)) return
  if (EXCLUDE_ADMINS && isAdmin(senderId)) return 

  await next()
})

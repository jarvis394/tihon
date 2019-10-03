const { updates } = require('../../../globals')
const User = require('../../../lib/User')

updates.on('message', async (update, next) => {
  const { senderId } = update

  if (update.isInbox && senderId > 0) {
    const user = new User(senderId)

    user.add(1)
  }

  await next()
})

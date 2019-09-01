const { updates, users: store } = require('../variables')
const User = require('../lib/User')

updates.on('message', async (update, next) => {
  const { senderId } = update

  if (update.isInbox) {
    const user = new User(senderId)

    user.add(1)
  }

  await next()
})

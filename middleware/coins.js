const { updates, users: store, log } = require('../variables')
const User = require('../lib/User')
const fs = require('fs')

/**
 * Flushes coins to database
 */
function flush() {
  let res = {}
  store.forEach((data, id) => (res[id] = data))

  fs.writeFile('temp/coinsData.json', JSON.stringify(res), err => {
    if (err) {
      log.error(err)
      return process.exit(1)
    } else {
      log.success('Saved temp data \n\n', { private: true })
      return process.exit(0)
    }
  })
}

process.on('SIGTERM', () => flush())
process.on('SIGINT', () => flush())

updates.on('message', async (update, next) => {
  const { senderId } = update

  if (update.isInbox) {
    const user = new User(senderId)

    user.add(1)
  }

  await next()
})

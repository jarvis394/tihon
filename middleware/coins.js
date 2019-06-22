const { updates } = require('../variables')
const { users: store, log } = require('../variables')
const User = require('../lib/User')
const fs = require('fs')

/**
 * Flushes coins to database
 */
function flush() {
  let res = {}
  store.forEach((data, id) => (res[id] = data))

  fs.writeFile('.temp/coinsData.json', JSON.stringify(res), err => {
    if (err) {
      log.error(err)
    } else {
      log.info('Saved temp data \n\n', { private: true })
      process.exit(0)
    }
  })
}

process.on('SIGTERM', () => flush())
process.on('SIGINT', () => flush())

updates.on('message', async (update, next) => {
  const { senderId } = update

  let user = new User(senderId)

  user.add(1)

  await next()
})

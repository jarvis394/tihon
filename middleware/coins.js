const store = require('store')
const User = require('../lib/User')
const fs = require('fs')
const log = require('loglevel')
const {
  updates
} = require('../variables')

/**
 * Flushes coins to database
 */
function flush() {
  let res = {}
  store.each((data, id) => res[id] = data)

  fs.writeFile('.temp/coinsData.json', JSON.stringify(res), (err) => {
    if (err) {
      log.error(err)
    } else {
      log.info('Saved temp data \n\n')
      process.exit(0)
    }
  })
}

process.on('SIGTERM', () => flush())
process.on('SIGINT', () => flush())

updates.on('message', async (update, next) => {
  const {
    senderId
  } = update

  let user = new User(senderId)

  await user.init()
  user.add(1)

  await next()
})
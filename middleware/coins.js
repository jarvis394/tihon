const {
  updates
} = require('../variables')
const store = require('../lib/store')
const User = require('../lib/User')
const fs = require('fs')
const log = require('loglevel')

/**
 * Flushes coins to database
 */
function flush() {
  let res = {}
  store.forEach((data, id) => res[id] = data)

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
  
  user.add(1)

  await next()
})
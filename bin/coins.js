<<<<<<< Updated upstream
const store = require("store")
const Coins = require("../lib/Coins")
=======
const store = require('store')
const Coins = require('../lib/User')
const fs = require('fs')
const { error } = require('../utils')
>>>>>>> Stashed changes

/**
 * Flushes coins to database
 */
function flush() {
<<<<<<< Updated upstream
  console.log("\n\n      Flushing coins to DB...\n\n")
  store.each((v, k) => {
    Coins.flush(k, v.data)
    console.log(k ,v)
=======
  console.log('\n\n      Flushing coins to DB...      \n\n')

  let res = {}
  store.each((data, id) => res[id] = data)

  fs.writeFile('.temp/coinsData.json', JSON.stringify(res), (err) => {
    if (err) {
      error(err)
    } else {
      console.log('      Successfully saved temporary data!      \n\n')
      process.exit(0)
    }
>>>>>>> Stashed changes
  })
  
  // process.exit(0)
}

<<<<<<< Updated upstream
module.exports = (updates) => {
  process.on("SIGTERM", () => flush())
  
  updates.on("message", async (context, next) => {
=======
process.on('SIGTERM', () => flush())
process.on('SIGINT', () => flush())

module.exports = (updates) => {
  updates.on('message', async (context, next) => {
>>>>>>> Stashed changes
    const { senderId } = context
  
    let stData = store.get(senderId)
    if (stData) {
      stData.data.amount++
      store.set(senderId, stData)
    } else {
      store.set(senderId, {
        data: await Coins.data(senderId)
      })
    }

    next()
  })
}
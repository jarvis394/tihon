const { error } = require("../utils")

const store = require("store")
const Coins = require("../lib/Coins")

 /**
 * Flushes coins to database
 */
function flush() {
  console.log("\n\n      Flushing coins to DB...\n\n")
  store.each((v, k) => {
    Coins.flush(k, v.data)
    console.log(k ,v)
  })
  
  // process.exit(0)
}

module.exports = (updates) => {
  process.on('SIGTERM', () => flush())
  
  updates.on("message", async (context, next) => {
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
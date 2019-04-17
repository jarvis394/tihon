const { error } = require("../utils")

const store = require("store")
const Coins = require("../lib/Coins")

function flush() {
  store.each(async (v, k) => await Coins.flush(k, v))
}

process.on('SIGUSR1', () => flush())
process.on('SIGUSR2', () => flush())
process.on('exit', () => flush())
process.on('SIGINT', () => flush())

module.exports = (updates) => {
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

    await next()
  })
}
const { error } = require("../utils")

const store = require("store")
const Coins = require("../lib/Coins")

process.on('exit', () => {
  
  let st = {}
  store.each((v, k) => st[k] = v)
  Coins.flush(st)
  
})

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
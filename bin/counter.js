const { error } = require("../utils")

const store = require("store")
const Coins = require("../lib/Coins")

module.exports = (updates, api, rs) => updates.on("message", async (context, next) => {
  const { session } = context.state
  const { senderId } = context

  if (!("counter" in session)) session.counter = 0
  session.counter += 1
  
  let stData = store.get(senderId)
  if (stData) {
    stData.data.amount++
    store.set(senderId, stData)
  }
  else {
    store.set(senderId, {
      data: await Coins.data(senderId)
    })
  }
  
  if (session.counter % 50 === 0) {
    try {
      let commandFile = require("../commands/random/random.js")
      commandFile.run(api, context, [], rs)
    } catch (e) { 
      error(e, "bin/counter")
    }
    
    session.counter = 0
  }

  await next()
})
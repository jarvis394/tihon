'use strict'

const { error } = require("../utils")

const store = require("store")
const CoinUser = require("../lib/CoinUser")

module.exports = (updates, api, rs) => updates.on("message", async (context, next) => {
  const { session } = context.state

  if (!("counter" in session)) session.counter = 0
  session.counter += 1
  
  if (store.get(context.senderId)) {
    store[context.senderId].add(1)
  } else {
    store.set(context.senderId, new CoinUser(context.senderId))
  }
  
  console.log(store)
  
  if (session.counter % 50 === 0) {
    try {
      let commandFile = require("../commands/random.js")
      commandFile.run(api, context, [], rs)
    } catch (e) { 
      error(e, "bin/counter")
    }
    
    session.counter = 0
  }

  await next()
})
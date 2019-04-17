'use strict'

const { error } = require("../utils")

const store = require("store")
const s = require("data-store")
const st = new s("store")
console.log(st.json())
const CoinUser = require("../lib/CoinUser")

module.exports = (updates, api, rs) => updates.on("message", async (context, next) => {
  const { session } = context.state

  if (!("counter" in session)) session.counter = 0
  session.counter += 1
  
  let stData = store.get(context.senderId)
  if (stData) {
   /* stData.data.amount++
    store.set(context.senderId.toString(), stData)
    */
    
    
    console.log("there is a data for", context.senderId, ":", stData)
  }
  else {
    console.log("no data for", context.senderId)
    store.set(context.senderId.toString(), new CoinUser(context.senderId))
    
  }
  
  /*if (store.get(context.senderId)) {
    let a = store.get(context.senderId)
    a.add(1)
    // store.get(context.senderId).add(1)
  } else {
    store.set(context.senderId, new CoinUser(context.senderId))
  }*/
  
  /*
  let j = {}
  store.each((v, k) => j[k] = v)
  console.log(j)*/
  
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
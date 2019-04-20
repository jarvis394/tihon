const { error } = require("../utils")

module.exports = (updates, api, rs) => updates.on("message", async (context, next) => {
  const { session } = context.state

  if (!("counter" in session)) session.counter = 0
  session.counter += 1
  
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
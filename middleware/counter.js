const { handleError } = require('../utils')
const {
  randomStorage,
  updates,
  api
} = require('../variables')

updates.on('message', async (update, next) => {
  const { session } = update.state

  if (!('counter' in session)) session.counter = 0
  session.counter += 1
  
  if (session.counter % 50 === 0) {
    try {
      let commandFile = require('../commands/random/random.js')
      commandFile.run(api, update, [], randomStorage)
    } catch (e) { 
      handleError(e)
    }
    
    session.counter = 0
  }

  await next()
})
const { log, requestsQueue } = require('../variables')

setInterval(async () => {
  if (!requestsQueue.isEmpty) {
    const response = await requestsQueue.processNext()
  }
}, 1000)

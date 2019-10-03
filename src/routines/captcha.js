const { log, requestsQueue } = require('../globals')

setInterval(async () => {
  if (!requestsQueue.isEmpty) {
    const response = await requestsQueue.processNext()
  }
}, 1000)

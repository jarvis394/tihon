const log = require('loglevel')
const request = require('request-promise-native')
const queue = []

function processQueue() {
  if (queue.length !== 0) {
    const item = queue.shift()

    request({
      method: 'POST',
      uri: 'https://tihon-log.glitch.me/log',
      body: item,
      json: true
    })

    setTimeout(processQueue, 0)
  }
}

const originalFactory = log.methodFactory
log.methodFactory = (methodName, level, loggerName) => {
  const rawMethod = originalFactory(methodName, level, loggerName)

  return function() {
    if (loggerName !== 'empty') {
      queue.push({
        message: [...arguments],
        timestamp: Date.now()
      })
      processQueue()
    }

    rawMethod.apply(undefined, [...arguments])
  }
}

log.setLevel(log.getLevel())

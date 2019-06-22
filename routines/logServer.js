const log = require('loglevel')
const request = require('request-promise-native')
const queue = []
let isSending = false

function sendNextMessage() {
  if (!queue.length || isSending) return

  isSending = true

  const item = queue.shift()

  request({
    method: 'POST',
    uri: 'https://tihon-log.glitch.me/log',
    body: item,
    json: true
  }).then(() => {
    isSending = false
    setTimeout(() => sendNextMessage(), 0)
  })
}

const originalFactory = log.methodFactory

log.methodFactory = (methodName, level, loggerName) => {
  const rawMethod = originalFactory(methodName, level, loggerName)

  return function() {
    if (loggerName !== 'empty') {
      queue.push({
        level: methodName,
        message: [...arguments],
        timestamp: Date.now()
      })

      sendNextMessage()
    }

    rawMethod.apply(undefined, [...arguments])
  }
}

log.setLevel(log.getLevel())

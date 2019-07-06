const { createLogger, format, transports } = require('winston')
const { combine, timestamp, splat, json } = format

const randomLog = createLogger({
  level: 'info',
  levels: { info: 0 },
  exitOnError: false,
  format: combine(
    timestamp(),
    splat(),
    json()
  ),
  transports: [
    new transports.File({
      filename: 'logs/random.log',
      level: 'info'
    })
  ]
})

module.exports = randomLog

const { createLogger, format, transports } = require('winston')
const { combine, timestamp, splat, json, errors, simple, printf } = format
const { COLORS, LEVELS } = require('../configs/log')

const ignorePrivate = format(info => {
  if (info.private) return false
  return info
})

const consoleFormat = printf(info => {
  return `${COLORS[info.level](`> [${info.level.toUpperCase()}]`)}  ${
    info.message
  }`
})

const log = createLogger({
  level: 'info',
  levels: LEVELS,
  exitOnError: false,
  format: format.combine(
    timestamp(),
    errors({ stack: true }),
    splat(),
    json()
  ),
  transports: [
    new transports.File({
      filename: 'logs/error.log',
      format: ignorePrivate(),
      level: 'error',
      handleExceptions: true
    }),
    new transports.File({
      filename: 'logs/main.log',
      format: ignorePrivate(),
      level: 'command',
      handleExceptions: true
    }),
    new transports.Console({
      level: 'command',
      format: combine(simple(), consoleFormat)
    })
  ]
})

module.exports = log

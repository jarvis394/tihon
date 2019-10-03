const chalk = require('chalk')

const COLORS = {
  debug: chalk.cyan,
  info: chalk.blue,
  warn: chalk.yellow,
  error: chalk.red,
  success: chalk.green,
  command: chalk.cyan,
}

const LEVELS = {
  error: 0,
  warn: 1,
  debug: 2,
  info: 3,
  success: 4,
  command: 5,
}

module.exports = {
  COLORS,
  LEVELS,
}

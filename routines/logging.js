console.log('- logging')

const log = require('loglevel')
const prefix = require('loglevel-plugin-prefix')
const chalk = require('chalk')
const {
  colors
} = require('../config')

prefix.reg(log)
log.enableAll()

prefix.apply(log, {
  format(level) {
    return `${colors[level](`> [${level}]`)} `
  },
})

prefix.apply(log.getLogger('critical'), {
  format(level) {
    return chalk.red.bold(`> [${level}] `)
  },
})

prefix.apply(log.getLogger('command'), {
  format() {
    return `${colors['CMD']('> [CMD] ')} `
  },
})

prefix.apply(log.getLogger('empty'), {
  format() {
    return ''
  },
})

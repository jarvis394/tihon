const fs = require('fs')
const { log } = require('../variables')

module.exports = path => fs.appendFile(path, '', err => err && log.error(err))

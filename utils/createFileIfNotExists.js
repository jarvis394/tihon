module.exports = path => {
  const fs = require('fs')
  const { log } = require('../variables')

  return fs.appendFile(path, '', err => err && log.error(err))
}

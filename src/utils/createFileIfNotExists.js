module.exports = path => {
  const fs = require('fs')
  const { log } = require('../globals')

  return fs.appendFile(path, '', err => err && log.error(err))
}

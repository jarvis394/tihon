exports.run = async (api, update, args) => {
  const { handleError } = require('../../utils')
  const { users: store } = require('../variables')
  const fs = require('fs')
  const log = require('loglevel')

  try {
    
    if (update.senderId !== 437920818) return
    
    let res = {}
    store.forEach((data, id) => res[id] = data)

    fs.writeFile('.temp/coinsData.json', JSON.stringify(res), (err) => {
      if (err) {
        log.error(err)
      } else {
        log.info('Saved temp data \n\n')
        process.exit(0)
      }
    })
    
  } catch (e) {
    handleError(update, e)
  }
}

exports.command = {
  'hidden': true
}
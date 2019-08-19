exports.run = async (api, update, args) => {
  const handleError = require('../../utils/handleError')
  const { users: store, log } = require('../../variables')
  const fs = require('fs')

  try {
    
    let res = {}
    store.forEach((data, id) => res[id] = data)

    fs.writeFile('temp/coinsData.json', JSON.stringify(res), (err) => {
      if (err) {
        log.error(err)
      } else {
        log.info('Saved temp data \n\n', { private: true })
        update.reply('👌')
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
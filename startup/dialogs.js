module.exports = async log => {
  const fs = require('fs')
  const { collect } = require('./init/firebase')
  const chalk = require('chalk')
  
  const data = await collect.messages.getConversations()
  const dialogs = data.items
  
  fs.writeFile('temp/dialogs.json', JSON.stringify({ dialogs }), (e) => {
    if (e) log.error(e)
    else log.success('Got dialogs with length ' + dialogs.length, { private: true })
  })
  
  return dialogs
}
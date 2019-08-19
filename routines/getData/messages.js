module.exports = () => {
  const events = require('../../lib/Events')
  const fs = require('fs')
  const path = require('path')
  const { log, collect } = require('../../variables')
  const { createFileIfNotExists } = require('../../utils')
  const count = 250

  const dialogsFilePath = path.resolve('temp/dialogs.json')
  const messagesFilePath = path.resolve('temp/messages.json')

  fs.readFile(dialogsFilePath, (err, data) => {
    if (err) return log.error(err)
    
    try {
      data = JSON.parse(data)
    } catch (e) {
      log.error(e)
      process.exit(1)
    }
    
    const executeItems = data.items.slice(0, count).map(el => ({
      peer_id: el.conversation.peer.id,
      count: 100,
      offset: 0
    }))

    createFileIfNotExists(messagesFilePath)

    collect.executes('messages.getHistory', executeItems).then(data => {
      if (data.errors.length !== 0) {
        data.errors.forEach(e => log.error('On getting messages: \n' + e))
      }

      fs.writeFile(messagesFilePath, JSON.stringify(data), err => {
        if (err) return log.error(err)

        log.info('Got messages history for ' + count + ' dialogs', { private: true })
        events.emit('getMessagesSuccess')
      })
    })
  })
}

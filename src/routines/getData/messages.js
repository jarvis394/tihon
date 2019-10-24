module.exports = () => {
  const events = require('../../lib/structures/Events')
  const fs = require('fs')
  const path = require('path')
  const { log, collect } = require('../../globals')
  const createFileIfNotExists = require('../../utils/createFileIfNotExists')
  const count = 50

  const dialogsFilePath = path.resolve('temp/dialogs.json')
  const messagesFilePath = path.resolve('temp/messages.json')
  
  createFileIfNotExists(dialogsFilePath)
  
  if (process.env.MODE === 'DEVELOPMENT') return events.emit('getMessagesSuccess')

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
      offset: 0,
    }))

    collect.executes('messages.getHistory', executeItems).then(data => {
      if (data.errors.length !== 0) {
        data.errors.forEach(e => log.error('On getting messages: \n' + e))
      }

      fs.writeFile(messagesFilePath, JSON.stringify(data), err => {
        if (err) return log.error(err)

        log.info('Got messages history for ' + count + ' dialogs', {
          private: true,
        })
        events.emit('getMessagesSuccess')
      })
    })
  })
}

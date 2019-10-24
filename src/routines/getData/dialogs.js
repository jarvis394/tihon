module.exports = () => {
  const { log, collect } = require('../../globals')
  const events = require('../../lib/structures/Events')
  const fs = require('fs')
  const path = require('path')
  const createFileIfNotExists = require('../../utils/createFileIfNotExists')

  const dialogsFilePath = path.resolve('temp/dialogs.json')
  const stream = collect.messages.getConversations({ extended: 0 })
  
  createFileIfNotExists(dialogsFilePath)
  
  if (process.env.MODE === 'DEVELOPMENT') return events.emit('getDialogsSuccess')
  
  stream.on('data', data => {
    fs.writeFile(dialogsFilePath, JSON.stringify(data), err => {
      if (err) return log.error(err)

      log.info(`Got ${data.total} dialogs`, { private: true })

      events.emit('getDialogsSuccess')
    })
  })
}

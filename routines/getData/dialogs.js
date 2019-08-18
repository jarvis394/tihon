module.exports = () => {
  const { log, collect } = require('../../variables')
  const events = require('../../lib/Events')
  const fs = require('fs')
  const path = require('path')
  const { createFileIfNotExists } = require('../../utils')

  const dialogsFilePath = path.resolve('temp/dialogs.json')
  const stream = collect.messages.getConversations({ extended: 0 })

  stream.on('data', data => {
    createFileIfNotExists(dialogsFilePath)

    fs.writeFile(dialogsFilePath, JSON.stringify(data), err => {
      if (err) return log.error(err)

      log.info(`Got ${data.total} dialogs`, { private: true })
    })
  })

  stream.on('end', () => events.emit('getDialogsSuccess'))
}

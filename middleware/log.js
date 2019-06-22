const { prefix, cooldown, ID } = require('../config')
const { handleError } = require('../utils')
const { updates, memoryStorage, talkedRecently, log } = require('../variables')

updates.on('message', async (update, next) => {
  try {
    let { peerId, text, senderId, id } = update

    if (talkedRecently.has(senderId)) return

    if (text && (text.startsWith(prefix) || text.startsWith('[id' + ID))) {
      log.log({
        level: 'command',
        message: text.startsWith('[id' + ID)
          ? '@tihon' + text.slice(('[id' + ID + '|@tihon_bot]').length)
          : text,
        command: true,
        peerId,
        senderId,
        id
      })
      console.log(
        '\tPeer: ' + peerId +
        ' | User: ' + senderId + ' | Message: ' + id
      )

      talkedRecently.add(senderId)
      setTimeout(() => talkedRecently.delete(senderId), cooldown)
    }

    let session = memoryStorage.has(peerId) ? memoryStorage.get(peerId) : {}

    update.state.session = session

    await next()

    memoryStorage.set(peerId, session)
  } catch (e) {
    handleError(update, e)
  }
})

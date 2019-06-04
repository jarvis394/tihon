const {
  prefix,
  cooldown,
  ID
} = require('../config')
const {
  handleError
} = require('../utils')
const log = require('loglevel')
const {
  updates,
  memoryStorage,
  talkedRecently
} = require('../variables')

updates.on('message', async (update, next) => {
  try {
    let {
      peerId,
      text,
      senderId
    } = update
    
    if (talkedRecently.has(senderId)) return
    
    if (text && (text.startsWith(prefix) || text.startsWith('[id' + ID))) {
      log.getLogger('command').info(text.startsWith('[id' + ID) ? '@tihon' + text.slice(('[id' + ID + '|@tihon_bot]').length) : text)
      log.getLogger('empty').info('         Peer:', peerId, '| User:', senderId)

      talkedRecently.add(senderId)
      setTimeout(() => talkedRecently.delete(senderId), cooldown)
    }

    let session = memoryStorage.has(peerId) ?
      memoryStorage.get(peerId) : {}

    update.state.session = session

    await next()

    memoryStorage.set(peerId, session)
  } catch(e) {
    handleError(update, e)
  }
})
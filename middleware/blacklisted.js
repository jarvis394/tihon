const { USERS, DIALOGS } = require('../configs/blacklist')
const { PREFIX, MENTION_PREFIX } = require('../configs/constants')
const { updates } = require('../variables')

updates.on('message', async (update, next) => {
  if (update.isOutbox) return
  else {
    const { senderId, peerId, text } = update

    if (
      text &&
      (text.startsWith(PREFIX) || text.startsWith(MENTION_PREFIX)) &&
      USERS.some(e => e.toString() === senderId.toString())
    )
      return update.reply('🤗 Подмойся, омжека')
    else if (
      text &&
      (text.startsWith(PREFIX) || text.startsWith(MENTION_PREFIX)) &&
      DIALOGS.some(e => e.toString() === peerId.toString())
    )
      return update.reply('🤗 Вы тут заблокированы)')
    else await next()
  }
})

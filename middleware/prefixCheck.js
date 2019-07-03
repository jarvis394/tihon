const { PREFIX, MENTION_PREFIX } = require('../configs/constants')
const { updates } = require('../variables')

updates.on('message', async (update, next) => {
  if (update.isOutbox) return
  else {
    let message = update.text

    if (message === '' || !message) return
    if (!message.startsWith(PREFIX) && !message.startsWith(MENTION_PREFIX))
      return

    if (message.startsWith(MENTION_PREFIX)) update.state.mentioned = true
    else update.state.mentioned = false

    await next()
  }
})

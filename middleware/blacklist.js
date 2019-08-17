const { USERS, DIALOGS } = require('../configs/blacklist')
const { updates } = require('../variables')

updates.on('message', async (update, next) => {
  const { senderId, peerId, state } = update

  if (state.isCommand) {
    // Check if user is in blacklist
    if (USERS.some(id => id === senderId)) {
      return update.reply('🤗 Подмойся, омежка')
    }

    // Check if dialog is in blacklist
    else if (DIALOGS.some(id => id === peerId)) {
      return update.reply('🤗 Вы тут заблокированы)')
    }
  }

  await next()
})

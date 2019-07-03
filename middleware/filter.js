const { USERS, DIALOGS } = require('../configs/blacklist')
const { ADMIN_ONLY } = require('../configs/admins')
const isAdmin = require('../utils/isAdmin')

module.exports = async update => {
  const { message, isOutbox, senderId, peerId, state } = update

  if (isOutbox) return
  if (message === '' || !message) return
  if (ADMIN_ONLY && !isAdmin(senderId)) return

  if (state.isCommand) {
    // Check if user is in blacklist
    if (USERS.some(id => id === senderId)) {
      return update.reply('🤗 Подмойся, омжека')
    }

    // Check if dialog is in blacklist
    else if (DIALOGS.some(id => id === peerId)) {
      return update.reply('🤗 Вы тут заблокированы)')
    }
  }
}

exports.run = async ({ update, args }) => {
  const DBDialog = require('../../lib/Dialog')

  const dialog = new DBDialog(update.peerId)

  let state = await dialog.checkData()
  state = state.no

  if (state) {
    state = false
    update.send('✨ Теперь отсюда бот будет брать сообщения')
  } else {
    state = true
    update.send('✨ Теперь отсюда бот не будет брать сообщения')
  }

  dialog.update({
    no: state,
  })
}

exports.command = {
  name: 'no',
  arguments: false,
  description: {
    en: 'Will your chat be in random.js?',
    ru: 'Будет или нет диалог попадать в random.js?',
  },
  group: 'settings',
}

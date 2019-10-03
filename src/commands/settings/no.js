exports.run = async ({ update, args }) => {
  const { db } = require('../../globals')
  let state = db
    .prepare('SELECT state FROM main.dialogs WHERE id =' + update.peerId)
    .get().state

  if (state) {
    state = false
    update.send('✨ Теперь отсюда бот будет брать сообщения')
  } else {
    state = true
    update.send('✨ Теперь отсюда бот не будет брать сообщения')
  }

  db.prepare(`UPDATE INTO main.dialogs SET canReadMessages = ${state}`).run()
}

exports.command = {
  name: 'no',
  arguments: false,
  description: {
    en: 'Will your chat be in random?',
    ru: 'Будет или нет диалог попадать в random?',
  },
  group: 'settings',
  alias: ['нет'],
}

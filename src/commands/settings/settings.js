exports.run = async ({ update, args }) => {
  const { db } = require('../../globals')
  const data = db
    .prepare('SELECT * FROM main.dialogs WHERE id =' + update.peerId)
    .get()

  let res =
    '⚙️ Настройки\n' +
    `⠀⠀Авто отправка сообщений: ${data.autoMailing ? 'Да' : 'Нет'}\n` +
    `  Брать сообщения из этого диалога: ${data.canReadMessages ? 'Да' : 'Нет'}`

  return await update.reply(res)
}

exports.command = {
  name: 'settings',
  arguments: false,
  description: {
    en: 'Changes settings of the dialog',
    ru: 'Изменяет настройки диалога',
  },
  group: 'settings',
}

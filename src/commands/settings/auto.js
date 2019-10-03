exports.run = async ({ update, args }) => {
  const { db } = require('../../globals')
  let state = db
    .prepare('SELECT autoMailing FROM main.dialogs WHERE id =' + update.peerId)
    .get().autoMailing

  if (state) {
    state = false
    update.reply('✨ Теперь здесь не будет отправляться рассылка')
  } else {
    state = true
    update.reply('✨ Теперь тут будет отправляться рассылка')
  }

  db.prepare(`UPDATE INTO main.dialogs SET autoMailing = ${state}`).run()
}

exports.command = {
  name: 'auto',
  arguments: false,
  description: {
    en: 'Disable/Enable auto-sending messages',
    ru: 'Отключить/Включить автоматическую рассылку сообщений',
  },
  alias: ['авто', 'рассылка'],
  group: 'settings',
}

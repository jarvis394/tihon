exports.run = async ({ update, args }) => {
  const DBDialog = require('../../lib/Dialog')

  const dialog = new DBDialog(update.peerId)

  let state = await dialog.checkData()
  state = state.auto

  if (state) {
    state = false
    update.send('✨ Теперь здесь не будет отправляться рассылка')
  } else {
    state = true
    update.send('✨ Теперь тут будет отправляться рассылка')
  }

  dialog.update({
    auto: state,
  })
}

exports.command = {
  name: 'auto',
  arguments: false,
  description: {
    en: 'Disable/Enable auto-sending messages',
    ru: 'Отключить/Включить автоматическую рассылку сообщений',
  },
  alias: ['авто'],
  group: 'settings',
}

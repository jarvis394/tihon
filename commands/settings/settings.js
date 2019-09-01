exports.run = async (api, update, args) => {
  const handleError = require('../../utils/handleError')

  const DBDialog = require('../../lib/DBDialog')
  const dialog = new DBDialog(update.peerId)

  async function showSettings() {
    let data = await dialog.checkData()
    let interval = data.auto
      ? `⠀⠀⠀| (interval) - Интервал отправки сообщений: ${data.interval /
          1000} секунд\n`
      : ''

    let res =
      '⚙️ Настройки\n' +
      `⠀⠀(auto) - Авто отправка сообщений: ${data.auto ? 'Да' : 'Нет'}\n` +
      interval +
      `⠀⠀(preset) - Пресет ролей: №${data.preset + 1}`

    return update.send(res)
  }

  try {
    if (args.length === 0) return await showSettings(update.peerId)
    else if (
      args[0] === 'auto' ||
      args[0] === 'interval' ||
      args[0] === 'preset'
    )
      return update.send(
        'Используй /' + args[0] + ', чтобы поменять насторйки.'
      )
  } catch (e) {
    handleError(update, e)
  }
}

exports.command = {
  name: 'settings',
  arguments: '(field) (value)|(поле) (значение)',
  description: {
    en: 'Changes settings of the dialog',
    ru: 'Изменяет настройки диалога'
  },
  group: 'settings'
}

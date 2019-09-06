exports.run = async (update, args) => {
  const handleError = require('../../utils/handleError')
  const { random } = require('../../utils/random')

  const DBDialog = require('../../lib/DBDialog')

  try {
    const dialog = new DBDialog(update.peerId)

    let state = await dialog.checkData()
    state = state.auto

    if (state) {
      if (args[0] && !isNaN(args[0])) {
        dialog.update({
          interval: parseInt(args[0]) * 1000
        })
        update.send('Интервал рассылки (в секундах): ' + args[0])
      } else if (args[0] && isNaN(args[0]))
        return update.send(
          'Интервал не число. \nПример: /interval ' + random(1000, 5000)
        )
      else
        return update.send(
          'Где интервал? \nПример: /interval ' + random(1000, 5000)
        )
    } else {
      return update.send('Рассылка не включена. \nВключить - /auto')
    }
  } catch (e) {
    handleError(update, e)
  }
}

exports.command = {
  name: 'interval',
  arguments: 'num|num',
  description: {
    en: 'Set interval of auto-sending (seconds)',
    ru: 'Установить время интервала автоматической рассылки сообщений (секунды)'
  },
  alias: ['интервал'],
  group: 'settings'
}

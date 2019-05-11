const {
  handleError
} = require('../../utils')

exports.run = async (api, update) => {
  try {
    update.send('> не готово пока')
  } catch (e) {
    handleError(update, e)
  }
}

exports.command = {
  'name': 'preset',
  'arguments': 'num|num',
  'description': {
    'en': 'Set roles preset',
    'ru': 'Установить пресет ролей'
  },
  'group': 'utils'
}
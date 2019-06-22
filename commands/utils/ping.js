exports.run = async (api, update) => {
  const { handleError } = require('../../utils')

  const replies = [
    'Шо ты меня пингуешь братец',
    'А?',
    'Я С СЕЛА',
    'Чавой?',
    'Пинг-понг'
  ]
  const { randomArray } = require('../../utils')

  try {
    await update.send(randomArray(replies))
  } catch (e) {
    handleError(update, e)
  }
}

exports.command = {
  name: 'ping',
  arguments: false,
  description: {
    en: 'Pong!',
    ru: 'Понг!'
  },
  alias: ['пинг', 'привет'],
  group: 'utils'
}

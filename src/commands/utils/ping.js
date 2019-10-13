exports.run = async () => {
  const replies = [
    'Шо ты меня пингуешь братец',
    'А?',
    'Я С СЕЛА',
    'Чавой?',
    'Пинг-понг',
  ]
  const { randomArray } = require('../../utils/random')

  return randomArray(replies)
}

exports.command = {
  name: 'ping',
  arguments: false,
  description: {
    en: 'Pong!',
    ru: 'Понг!',
  },
  alias: ['пинг', 'эй', 'привет'],
  group: 'utils',
}

exports.run = async ({ update, args }) => {
  const replies = [
    'Шо ты меня пингуешь братец',
    'А?',
    'Я С СЕЛА',
    'Чавой?',
    'Пинг-понг',
  ]
  const { randomArray } = require('../../utils/random')

  await update.send(randomArray(replies))
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

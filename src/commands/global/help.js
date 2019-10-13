exports.run = async () => {
  return '🔍 Смотри команды на сайте: https://dedtihon.cf'
}

exports.command = {
  name: 'help',
  arguments: false,
  description: {
    en: 'Helps you find a description of the command you need',
    ru: 'Помогает найти нужную тебе команду',
  },
  alias: ['помощь', 'справка', 'начать'],
  group: 'global',
}

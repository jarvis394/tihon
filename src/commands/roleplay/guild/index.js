const handleError = require('../../../utils/handleError')

exports.run = async ({ update, args }) => {
  const aliases = {
    create: ['создать'],
    info: ['инфа'],
    help: ['помощь', 'справка'],
    list: ['список', 'состав'],
    invite: ['пригласить'],
    accept: ['принять'],
    kick: ['выгнать', 'кик', 'бан'],
    giveAdmin: ['выдать'],
    takeAdmin: ['снять'],
    money: ['казна'],
    battle: ['битва'],
    top: ['топ'],
    leave: ['выйти'],
    delete: ['распустить'],
  }

  try {
    let file = args[0]

    if (!file) file = 'info'

    for (let key in aliases) {
      if (aliases[key].some(e => e === file.toLowerCase())) {
        file = key
        break
      }
    }

    const module = require(`./${file}`)

    await module.run(update, args)
  } catch (e) {
    if (e.code === 'MODULE_NOT_FOUND') {
      return update.reply('Такой команды не существует 😑')
    } else {
      handleError(update, e)
    }
  }
}

exports.command = {
  description: {
    ru: 'Управление своим колхозом',
    en: 'Manage your guild',
  },
  alias: ['колхоз', 'гильдия'],
}

exports.run = async ({ update, args }) => {
  const User = require('../../lib/models/User')

  const user = new User(update.senderId)
  const { state, amount } = await user.isEnoughFor(1000)
  if (!state)
    return update.reply(
      `🧮 Не хватает денег: у тебя ${amount} T, а нужно 1000 T`
    )

  let file = args[0]
  const list = require('./list').command
  const who = require('./who').command

  if (file === 'list' || list.alias.some(e => e === file)) {
    file = 'list'
  } else if (file === 'who' || who.alias.some(e => e === file)) {
    file = 'who'
  } else if (!file) {
    return update.reply('✖️ Введи команду')
  } else {
    return update.reply('✖️ Нет такой команды!')
  }

  user.subtract(1000)

  require('./' + file).run({
    update,
    args,
    mentionCmdState: true,
  })
}

exports.command = {
  arguments: '(arg)|(предл.)',
  description: {
    en: 'Who is ***?',
    ru: 'Кто ***?',
  },
  alias: ['упомянуть', 'упомяни'],
  group: 'utils',
}

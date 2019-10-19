exports.run = async ({ update, args }) => {
  const User = require('../../lib/models/User')

  const format = require('../../utils/format')
  const { USERS } = require('../../configs/blacklist')

  let id
  try {
    id = parseInt(args[0].split('|')[0].slice(3))
    if (isNaN(id)) throw new Error('argument is NaN')
  } catch (e) {
    id = update.senderId
  }

  if (id < 0) {
    return update.reply('🔻 Нельзя посмотреть репутацию группы')
  }

  if (USERS.some(e => e === id.toString()))
    return update.reply('😠 Этот пользователь заблокирован')

  const user = new User(id)

  return update.reply(
    (id === update.senderId
      ? 'Твоя репутация:⠀⠀\n'
      : 'Репутация ' + (await user.getFullName('acc')) + ': \n') +
      '💠 ' +
      format(user.reputation) +
      ' R'
  )
}

exports.command = {
  name: 'reputation',
  arguments: false,
  description: {
    en: 'Shows reputation of user',
    ru: 'Показывает репутацию пользователя',
  },
  alias: ['rep', 'реп', 'репутация'],
  group: 'shop',
}

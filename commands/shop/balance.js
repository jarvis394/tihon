exports.run = async (api, update) => {
  const User = require('../../lib/User')
  const { handleError } = require('../../utils')
  const { users: store } = require('../../variables')

  try {
    const user = new User(update.senderId)
    update.send('⠀⠀Твой баланс:⠀⠀\n' + '💵 ' + (await user.getAmount()) + 'T')
  } catch (e) {
    handleError(update, e)
  }
}

exports.command = {
  name: 'balance',
  arguments: false,
  description: {
    en: 'Shows balance of user',
    ru: 'Показывает баланс пользователя'
  },
  alias: ['баланс'],
  group: 'shop'
}

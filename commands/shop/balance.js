const { handleError } = require('../../utils')
const store = require('../../lib/store')
const User = require('../../lib/User')

exports.run = async (api, update) => {
  try {
    const user = new User(update.senderId)
    update.send(
      '⠀⠀Твой баланс:⠀⠀\n' +
      '💵 ' + await user.getAmount() + 'T'
    )
    
  } catch (e) {
    handleError(update, e)
  }
}

exports.command = {
  'name': 'balance',
  'arguments': false,
  'description': {
    'en': 'Shows balance of user',
    'ru': 'Показывает баланс пользователя'
  },
  'alias': [
    'баланс'
  ],
  'group': 'shop'
}
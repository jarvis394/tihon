exports.run = async (api, update, args) => {
  const User = require('../../lib/User')
  const handleError = require('../../utils/handleError')
  const { users: store } = require('../../variables')
  const { BLACKLIST } = require('../../config')
  
  try {
    
    let id
    try { 
      id = parseInt(args[0].split('|')[0].slice(3))
      if (isNaN(id)) throw new Error('argument is NaN')
    } catch (e) {
      id = update.senderId
    }
    
    if (BLACKLIST.some(e => e === id.toString())) return update.reply('😠 Этот пользователь заблокирован')
    
    const user = new User(id)

    return update.reply(
      (id === update.senderId ? 
        'Твой баланс:⠀⠀\n' : 
        'Баланс ' + id + ': \n') + 
      '💵 ' + (await user.getAmount()) + 'T'
    )
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

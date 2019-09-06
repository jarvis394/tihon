exports.run = async (update, args) => {
  const User = require('../../lib/User')
  const handleError = require('../../utils/handleError')
  const { USERS } = require('../../configs/blacklist')
  
  try {
    let id
    try { 
      id = parseInt(args[0].split('|')[0].slice(3))
      if (isNaN(id)) throw new Error('argument is NaN')
    } catch (e) {
      id = update.senderId
    }
    
    if (USERS.some(e => e === id.toString())) return update.reply('😠 Этот пользователь заблокирован')
    
    const user = new User(id)

    return update.reply(
      (id === update.senderId ? 
        'Твоя репутация:⠀⠀\n' : 
        'Репутация ' + id + ': \n') + 
      '💠 ' + new Intl.NumberFormat('en-IN').format(await user.getReputation()) + ' R'
    )
  } catch (e) {
    handleError(update, e)
  }
}

exports.command = {
  name: 'reputation',
  arguments: false,
  description: {
    en: 'Shows reputation of user',
    ru: 'Показывает репутацию пользователя'
  },
  alias: ['rep', 'реп', 'репутация'],
  group: 'shop'
}

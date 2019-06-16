exports.run = async (api, update, args) => {
  const User = require('../../lib/User')
  const shopData = require('../../shopData')
  const { handleError } = require('../../utils')

  try {
    
    if (update.senderId !== 437920818) return
    
    let user = new User(args[0] && args[1] ? args[1].split('|')[0].slice(3) : update.senderId)
    
    if (!args[0]) return update.send('❌ no num provided')
    
    let id = parseInt(args[0])
    let item = shopData.getItemById(id)
    let group = shopData.getGroupById(item.groupId)
    user.addItem(group, id)
    
    return update.send('added ' + args[0])
    
  } catch (e) {
    handleError(update, e)
  }
}

exports.command = {
  'hidden': true
}
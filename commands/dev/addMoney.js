const User = require('../../lib/User')
const { handleError } = require('../../utils')

exports.run = async (api, update, args) => {
  try {
    
    if (update.senderId !== 437920818) return
    
    let user = new User(args[0] && args[1] ? args[1].split('|')[0].slice(3) : update.senderId)
    await user.init()
    
    if (!args[0]) return update.send('❌ no num provided')
    
    user.add(parseInt(args[0]))
    
    return update.send('added ' + args[0])
    
  } catch (e) {
    handleError(update, e)
  }
}

exports.command = {
  'hidden': true
}
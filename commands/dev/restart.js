const User = require('../../lib/User')
const { handleError } = require('../../utils')

exports.run = async (api, update, args) => {
  try {
    
    if (update.senderId !== 437920818) return
    
    process.exit(0)
    
  } catch (e) {
    handleError(update, e)
  }
}

exports.command = {
  'hidden': true
}
const { handleError } = require('../../utils')

exports.run = async (api, update, args) => {
  try {
    
    if (update.senderId !== 437920818) return
    
    update.someRandomFunction()
    
  } catch (e) {
    handleError(update, e)
  }
}

exports.command = {
  'hidden': true
}
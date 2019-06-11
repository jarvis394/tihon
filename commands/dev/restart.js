exports.run = async (api, update, args) => {
  const { handleError } = require('../../utils')
  
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
exports.run = async (api, update, args) => {
  const handleError = require('../../utils/handleError')
  
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
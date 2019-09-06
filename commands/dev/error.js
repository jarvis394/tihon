exports.run = async (update, args) => {
  const handleError = require('../../utils/handleError')
  
  try {
    
    update.someRandomFunction()
      
  } catch (e) {
    handleError(update, e)
  }
}

exports.command = {
  'hidden': true
}
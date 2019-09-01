exports.run = async (api, update, args) => {
  const handleError = require('../../utils/handleError')
  
  try {
    
    await update.reply('👌')
    process.kill(process.pid)
    
  } catch (e) {
    handleError(update, e)
  }
}

exports.command = {
  'hidden': true
}
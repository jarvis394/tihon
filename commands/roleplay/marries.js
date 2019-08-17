module.exports.run = async (api, update, args) => {
  const handleError = require('../utils/handleError')
  const User = require('../../lib/User')

  try {
    const { senderId } = update 
    const user = new User(args[0] && args[1] ? args[1].split('|')[0].slice(3) : senderId)

    return update.reply(`${user.data}`)

  } catch (e) {
    handleError(update, e)
  }
}

module.exports.command = {
  arguments: false,
  description: {
    en: '',
    ru: ''
  },
  alias: []
}

module.exports.run = async (api, update, args) => {
  const handleError = require('../utils/handleError')

  try {
    return update.send('')
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

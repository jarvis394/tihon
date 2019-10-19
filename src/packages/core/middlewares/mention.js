const randomMessage = require('../../../utils/randomMessage')

module.exports = async update => {
  const message = await randomMessage()

  return await update.send(message.text)
}

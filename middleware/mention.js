const randomMessage = require('../utils/randomMessage')
const { api } = require('../variables')

module.exports = async update => {
  const message = await randomMessage()
  
  return await update.send(message.text)
}

const firebase = require('./firebase')
const vk = require('./vk')

module.exports = {
  ...firebase,
  ...vk
}
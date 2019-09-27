require('./env')

const db = require('./database')
const vk = require('./vk')

module.exports = {
  ...db,
  ...vk,
}

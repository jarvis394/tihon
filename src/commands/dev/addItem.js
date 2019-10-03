exports.run = async ({ update, args }) => {
  const User = require('../../lib/User')
  const { getItemById, getGroupById } = require('../../utils/shop')

  let user = new User(
    args[0] && args[1] ? args[1].split('|')[0].slice(3) : update.senderId
  )

  if (!args[0]) return update.send('❌ no num provided')

  let id = parseInt(args[0])
  let item = getItemById(id)
  user.setItem(id)

  return update.send('added ' + args[0])
}

exports.command = {
  hidden: true,
}

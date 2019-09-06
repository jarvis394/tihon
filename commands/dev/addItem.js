exports.run = async (update, args) => {
  const User = require('../../lib/User')
  const { getItemById, getGroupById } = require('../../utils/shop')
  const handleError = require('../../utils/handleError')

  try {
    let user = new User(
      args[0] && args[1] ? args[1].split('|')[0].slice(3) : update.senderId
    )

    if (!args[0]) return update.send('❌ no num provided')

    let id = parseInt(args[0])
    let item = getItemById(id)
    let group = getGroupById(item.groupId)
    user.addItem(group, id)

    return update.send('added ' + args[0])
  } catch (e) {
    handleError(update, e)
  }
}

exports.command = {
  hidden: true
}

exports.run = async (api, update, args) => {
  const handleError = require('../../utils/handleError')
  const User = require('../../lib/User')
  const {
    getGroupByName,
    getGroupByAccName,
    getGroupByTitle,
    getItemById
  } = require('../../utils/shop')

  try {
    const name = await api.users.get({
      user_ids: update.senderId
    })
    const user = new User(update.senderId)

    if (!args[0]) {
      return update.send('😕 Ты не ввел группу, в которой находится предмет')
    }

    if (args[0] && (!getGroupByAccName(args[0]) && !getGroupByTitle(args[0]) && !getGroupByName(args[0]))) {
      return update.send('😕 Ты ввел несуществующую группу')
    }

    let groupName = args[0]
    let group = getGroupByAccName(groupName)

    if (!group) group = getGroupByName(groupName)
    if (!group) group = getGroupByTitle(groupName)

    let items = await user.fetchInventory()
    let id = items[group.title][0]
    let item = getItemById(id)

    if (!id) {
      return update.send('🧮 У тебя нет предмета в этой группе')
    }

    if (!item) {
      return update.send('❌ У тебя есть несуществующий предмет')
    }

    user.add(item.price / 2)
    await user.subtractReputation(item.rep)
    await user.removeItem(group.title, 0)

    return update.send(
      `🎉 ${name[0].first_name} продал предмет ${item.name} за ${item.price /
        2}T`
    )
  } catch (e) {
    handleError(update, e)
  }
}

exports.command = {
  arguments: false,
  description: {
    en: 'Sells something from inventory',
    ru: 'Продаёт что нибудь из инвентаря'
  },
  alias: ['продать']
}

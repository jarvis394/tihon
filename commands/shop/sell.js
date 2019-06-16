exports.run = async (api, update, args) => {
  const { handleError } = require('../../utils')
  const User = require('../../lib/User')
  const data = require('../../shopData')

  try {
    let name = await api.users.get({
      user_ids: update.senderId
    })
    let user = new User(update.senderId)

    if (!args[0]) {
      return update.send('😕 Ты не ввел группу, в которой находится предмет')
    }

    if (
      args[0] &&
      (!data.getGroupByTitle(args[0]) && !data.getGroupByName(args[0]))
    ) {
      return update.send('😕 Ты ввел несуществующую группу')
    }

    if (!args[1]) {
      return update.send('😕 Ты не ввел номер предмета, который хочешь продать')
    }

    if (isNaN(args[1])) {
      return update.send('😕 Номер предмета - это число, знаешь.')
    }

    let n = parseInt(args[1]) - 1
    let groupName = args[0]
    let group = data.getGroupByTitle(groupName)

    if (!group) group = data.getGroupByName(groupName)

    let items = await user.fetchInventory()
    let id = items[group.title][n]
    let item = data.getItemById(id)

    if (!id) {
      return update.send('🧮 У тебя нет предмета под таким номером')
    }

    if (!item) {
      return update.send('❌ У тебя есть несуществующий предмет')
    }

    user.add(item.price)
    await user.removeItem(group.title, n)

    return update.send(
      `🎉 ${name[0].first_name} продал предмет ${item.name} за ${item.price}T`
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

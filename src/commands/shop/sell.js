exports.run = async ({ update, args }) => {
  const User = require('../../lib/models/User')
  const {
    getGroupByName,
    getGroupByProfileName,
    getGroupByTitle,
    getItemById,
  } = require('../../utils/shop')
  const format = require('../../utils/format')
  const { api } = require('../../globals')

  const user = new User(update.senderId)
  const name = await user.getName()

  if (!args[0]) {
    return update.send('😕 Ты не ввел группу, в которой находится предмет')
  }

  let groupName = args[0].toLowerCase()
  let group =
    getGroupByProfileName(groupName) ||
    getGroupByName(groupName) ||
    getGroupByTitle(groupName)

  if (!group) {
    return update.send('😕 Ты ввел несуществующую группу')
  }

  let items = user.items
  let dbItem = items[group.title]

  if (!dbItem.id) {
    return update.send('🔻 У тебя нет предмета в этой группе')
  }

  let item = getItemById(dbItem.id)

  if (!item) {
    return update.send('🔻 У тебя есть несуществующий предмет')
  }

  user.add(item.price / 2)
  user.subtractReputation(item.rep)
  user.removeItem(group.title)

  return update.send(
    `🎉 ${name.first_name} продал предмет ${item.name} за ${format(
      item.price / 2
    )} ₮`
  )
}

exports.command = {
  arguments: false,
  description: {
    en: 'Sells something from inventory',
    ru: 'Продаёт что нибудь из инвентаря',
  },
  alias: ['продать'],
}

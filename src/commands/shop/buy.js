exports.run = async ({ update, args }) => {
  const User = require('../../lib/models/User')
  const { getGroupById, getItemById } = require('../../utils/shop')

  const user = new User(update.senderId)
  const name = await user.getName('gen')

  if (!args[0]) {
    return update.send('😕 Ты не ввел ID предмета, который хочешь купить')
  }

  if (isNaN(args[0])) {
    return update.send('😕 ID предмета - это число, знаешь.')
  }

  let id = parseInt(args[0])
  let item = getItemById(id)

  if (!item) return update.send('🔻 Такого предмета нет в магазине')

  const { amount, state } = await user.isEnoughFor(item.price)

  if (!state) {
    return update.send(
      '🧮 Недостаточно денег - у тебя ' +
        +amount +
        ' ₮, а нужно ' +
        item.price +
        ' ₮'
    )
  }

  const group = getGroupById(item.groupId)
  const addItemSuccess = user.setItem(item.id)

  if (!addItemSuccess)
    return update.send(`🔻 В группе ${group.name} нельзя иметь больше вещей`)

  user.subtract(item.price)
  user.addReputation(item.rep)

  return update.send(
    `🎉 Теперь у ${name.first_name} есть предмет ${item.name}\n` +
      '\nЧтобы продать, нужно использовать команду "продать" и группу:' +
      '\n@tihon_bot, продать дом'
  )
}

exports.command = {
  arguments: '(id)|(id)',
  description: {
    en: 'Buy an item',
    ru: 'Купить вещь',
  },
  alias: ['купить', 'купит', 'купитт', 'кпить', 'купля'],
}

exports.run = async (api, update, args) => {
  const User = require('../../lib/User')
  const handleError = require('../../utils/handleError')
  const { getGroupById, getItemById } = require('../../utils/shop')

  try {
    const name = await api.users.get({
      user_ids: update.senderId,
      name_case: 'gen'
    })
    const user = new User(update.senderId)

    if (!args[0]) {
      return update.send('😕 Ты не ввел ID предмета, который хочешь купить')
    }

    if (isNaN(args[0])) {
      return update.send('😕 ID предмета - это число, знаешь.')
    }

    let id = parseInt(args[0])
    let item = getItemById(id)

    if (!item) return update.send('❌ Такого предмета нет в магазине')

    const { amount, state } = await user.isEnoughFor(item.price)

    if (!state) {
      return update.send(
        '🧮 Недостаточно денег - у тебя ' +
          +amount +
          'T, а нужно ' +
          item.price +
          'T'
      )
    }

    const group = getGroupById(item.groupId)

    const addItemSuccess = await user.addItem(group, item.id)

    if (!addItemSuccess)
      return update.send(
        `❌ В группе ${group.name} нельзя иметь больше вещей, максимум ${
          group.maxItems
        }`
      )
    
    user.subtract(item.price)
    user.addReputation(item.rep)

    return update.send(
      `🎉 Теперь у ${name[0].first_name} есть предмет ${item.name}\n` +
        '\nЧтобы продать, нужно использовать команду "продать", группу и номер вещи в профиле:' +
        '\n@tihon_bot, продать дома 1'
    )
  } catch (e) {
    handleError(update, e)
  }
}

exports.command = {
  arguments: '(id)|(id)',
  description: {
    en: 'Buy an item',
    ru: 'Купить вещь'
  },
  alias: ['купить', 'купит', 'купитт', 'кпить', 'купля']
}

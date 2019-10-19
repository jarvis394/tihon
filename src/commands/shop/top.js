exports.run = async ({ update, args }) => {
  const User = require('../../lib/models/User')
  const { api } = require('../../globals')
  const getUsersTop = require('../../utils/getUsersTop')
  const format = require('../../utils/format')
  const { CURRENCY } = require('../../configs/constants')
  const top = getUsersTop()
  const filteredTop = top.filter(e => e.reputation > 0)
  let res = []
  let names = await api.users.get({
    user_ids: filteredTop.map(e => e.id).join(','),
  })

  const user = new User(update.senderId)
  const money = user.money
  const reputation = user.reputation
  const place = top.findIndex(e => e.id === user.id) + 1

  filteredTop.slice(0, 10).forEach(async (e, i) => {
    const m = new User(e.id)
    const name =
      m.id === user.id
        ? names[i].first_name + ' ' + names[i].last_name
        : `[id${e.id}|${names[i].first_name} ${names[i].last_name}]`

    res.push(
      `${i + 1}. ${name} \n    🏦 ${format(m.money)} ${CURRENCY} - 💠 ${format(
        m.reputation
      )} R`
    )
  })

  if (place > 11) {
    res.push('\n...')
  }

  if (place && place > 10) {
    res.push(
      `${place}. ${await user.getFullName()} \n    🏦 ${format(
        money
      )} ${CURRENCY} - 💠 ${format(reputation)} R`
    )
  } else if (place == null) {
    res.push(
      `>100 ${await user.getFullName()} \n    🏦 ${format(
        money
      )} ${CURRENCY} - 💠 ${format(reputation)} R`
    )
  }

  return update.reply(res.join('\n'))
}

exports.command = {
  name: 'top',
  arguments: false,
  description: {
    en: 'Shows balance of user',
    ru: 'Показывает баланс пользователя',
  },
  alias: ['топ'],
  group: 'shop',
}

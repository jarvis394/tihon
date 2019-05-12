const {
  handleError
} = require('../../utils')

const User = require('../../lib/User')
const shopData = require('../../shopData')

exports.run = async (api, update) => {
  try {

    let {
      senderId
    } = update
    let name = await api.users.get({
      user_ids: senderId,
      name_case: 'gen'
    })
    let user = new User(senderId)
    let res = [
      `Профиль ${name[0].first_name}:\n`
    ]

    await user.init()

    if (user.data.items.length === 0) {
      res.push('📜 Пока ничего')
    } else {
      user.data.items.forEach((id, i) => {
        let item = shopData.items.find(i => i.id === parseInt(id))

        res.push(` ${i + 1}) ${item.icon} ${item.name}`)
      })
    }

    update.send(res.join('\n'))

  } catch (e) {
    handleError(update, e)
  }
}

exports.command = {
  'arguments': false,
  'description': {
    'en': 'Shows user\'s profile',
    'ru': 'Показывает профиль пользователя'
  },
  'alias': [
    'профиль'
  ]
}
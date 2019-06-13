exports.run = async (api, update) => {
  const User = require('../../lib/User')
  const { handleError } = require('../../utils')

  const shopData = require('../../shopData')

  try {
    let { senderId } = update
    let name = await api.users.get({
      user_ids: senderId,
      name_case: 'gen'
    })
    let user = new User(senderId)
    let res = [`Профиль ${name[0].first_name}:\n`]
    let items = await user.fetchInventory()

    if (items.length === 0) {
      res.push('📜 Пока ничего')
    } else {
      items.forEach((id, i) => {
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
  arguments: false,
  description: {
    en: 'Shows user\'s profile',
    ru: 'Показывает профиль пользователя'
  },
  alias: ['профиль']
}

/* eslint-disable no-unused-vars */

const { handleError } = require('../../utils')

const {
  data
} = require('../../lib/User')
const shopData = require('../../shopData')

const store = require('store')

exports.run = async (api, update) => {
  try {
    
    let name = await api.users.get({
      user_ids: update.senderId,
      name_case: 'gen'
    })
    let user = await data(update.senderId)
    
    let res = [
      `Профиль ${name[0].first_name}:\n`
    ]
    
    if (user.items.length === 0) {
      res.push('📜 Пока ничего')
    } else {
      user.items.forEach((id, i) => {
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
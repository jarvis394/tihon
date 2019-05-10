/* eslint-disable no-unused-vars */

const { handleError } = require('../../utils')

const {
  data
} = require('../../lib/User')

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
    
    for (let item of user.items) {
      res.push(` ${item.icon} ${item.name}`)
    }
    
    update.send(res.join('\n'))
    
  } catch (e) {
    handleError(update, e)
  }
}

exports.command = {
  'arguments': false,
  'description': {
    'en': '',
    'ru': ''
  },
  'alias': [
    'профиль'
  ]
}
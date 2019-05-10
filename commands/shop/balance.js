<<<<<<< Updated upstream
const { handleError } = require("../../utils")

const store = require("store")
=======
const { handleError } = require('../../utils')
const store = require('store')
>>>>>>> Stashed changes

exports.run = async (api, update) => {
  try {
    
<<<<<<< Updated upstream
    await update.send(
      "⠀⠀Твой баланс:⠀⠀\n" +
      "💵 " + store.get(update.senderId).data.amount + "T"
=======
    update.send(
      '⠀⠀Твой баланс:⠀⠀\n' +
      '💵 ' + store.get(update.senderId).amount + 'T'
>>>>>>> Stashed changes
    )
    
  } catch (e) {
    handleError(update, e)
  }
}

exports.command = {
<<<<<<< Updated upstream
  "name": "balance",
  "arguments": false,
  "description": {
    "en": "",
    "ru": ""
=======
  'name': 'balance',
  'arguments': false,
  'description': {
    'en': 'Shows balance of user',
    'ru': 'Показывает баланс пользователя'
>>>>>>> Stashed changes
  },
  'alias': [
    'баланс'
  ],
  'group': 'shop'
}
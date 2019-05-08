const { handleError } = require("../../utils")
const store = require("store")

exports.run = async (api, update) => {
  try {
    
    update.send(
      "⠀⠀Твой баланс:⠀⠀\n" +
      "💵 " + store.get(update.senderId).amount + "T"
    )
    
  } catch (e) {
    handleError(update, e)
  }
}

exports.command = {
  "name": "balance",
  "arguments": false,
  "description": {
    "en": "Shows balance of user",
    "ru": "Показывает баланс пользователя"
  },
  "alias": [
    "баланс"
  ],
  "group": "shop"
}
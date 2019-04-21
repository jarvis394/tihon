const { handleError } = require("../../utils")

const store = require("store")

exports.run = async (api, update) => {
  try {
    
    await update.send(
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
    "en": "",
    "ru": ""
  },
  "alias": [
    "баланс"
  ],
  "group": "shop"
}
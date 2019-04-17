const { handleError } = require("../../utils")

const store = require("store")

exports.run = async (api, update) => {
  try {
    
    await update.send(
      "⠀⠀⠀Твой баланс:" +
      "💵 " + await store[update.senderId].getAmount() + "T"
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
    ""
  ],
  "group": "shop"
}
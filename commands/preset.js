const {
  handleError
} = require("../utils")

const DBDialog = require("../lib/DBDialog")

exports.run = async (api, update, args) => {
  try {
    update.send("> не готово пока")
  } catch (e) {
    handleError(update, e)
  }
}

exports.command = {
  "name": "preset",
  "arguments": "num|num",
  "description": {
    "en": "Set roles preset",
    "ru": "Установить пресет ролей"
  }
}
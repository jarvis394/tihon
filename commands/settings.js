const { handleError } = require("../utils")
const {
  randomArray
} = require("../utils");

exports.run = async (api, update, args) => {
  try {
    


  } catch (e) {
    handleError(update, e)
  }
}

exports.command = {
  "name": "settings",
  "arguments": "(field) (value)|(поле) (значение)",
  "description": {
    "en": "Changes settings of the dialog",
    "ru": "Изменяет настройки диалога"
  }
}
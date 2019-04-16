const { handleError } = require("../utils")

exports.run = async (api, update) => {
  try {
    await update.send(`Счётчик: (${update.state.session.counter})`)
  } catch (e) {
    handleError(update, e)
  }
}

exports.command = {
  "name": "counter",
  "arguments": false,
  "description": {
    "en": "Show current amount of messages (on every 50th message bot send random thing)",
    "ru": "Показывает количество сообщений до отправки всякой рандомной фигни (каждое 50 сообщение)"
  },
  "group": "utils"
}
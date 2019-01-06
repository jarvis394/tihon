const replies = [
  "Шо ты меня пингуешь братец",
  "А?",
  "Я С СЕЛА",
  "Чавой?",
  "Пинг-понг"
]
const { randomArray } = require("../utils");

exports.run = async (api, update, args) => {
  await update.send(randomArray(replies))
}

exports.command = {
  "name": "ping",
  "arguments": false,
  "description": {
    "en": "Pong!",
    "ru": "Понг!"
  }
}
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
const { ID } = require("../config");
const { randomArray } = require("../utils");
const answers = [
  "a?",
  "чо",
  "шо тобi",
  "что надо",
  "ну",
  "я слушаю",
  "да да я",
  "э",
  "ну cho",
  "да чё"
]

module.exports = (updates) => updates.on('message', async (context, next) => {
  let {
    text
  } = context;

  if (text && !text.startsWith("/") && text.split(" ").some(el => el.startsWith("[id" + ID))) {
    context.send(randomArray(answers));
  }

  await next();
});
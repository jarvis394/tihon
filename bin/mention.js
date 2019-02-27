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

const rateCmd = [
  "оцени",
  "как тебе",
  "ну",
  "?",
  "норм",
  "норм?"
]

module.exports = (updates) => updates.on('message', async (context, next) => {
  let {
    text
  } = context;

  if (text && !text.startsWith("/") && text.split(" ").some(el => el.startsWith("[id" + ID))) {
    if (rateCmd.some(el => el.startsWith(text.split(" ")[1]))) return await require("../commands/rate").run(null, context, [])
    
    context.send(randomArray(answers));
  }

  await next();
});
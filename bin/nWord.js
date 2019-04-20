/* eslint-disable */

const { randomArray } = require("../utils")
const stops = {
  "сука": [/сук[а]/, "Сам ты сука", "Скука", "Срука", "Слыш э", "Я кобель"],
  "ебал": [/ебал[а]/, "Ебли себя лучше", "Ебло", "Ебалка))", "Да сам ебись куда подальше", "Солидарен, ебал тоже"],
  "блять": [/бл[ять|ть|т]/, "Ну ебана рот",  "Блять.", "Аэуеть блять", "Лол блять лол", "Блин блинский", "***"],
  "хуй": [/хуй[ня]/, "Застрахуй", "Хуйня", "Хуй хуйня хоть худа", "Хрень согласен", "Харча тьфю"],
  "нахуй": [/пош[е|ё]л[а] нах[уй]/, "Сам пошел", "Мне больше 60!!!", "Тихо тут, молодеж", "Тьфю сам иди", "Пошел ты нахуй сам", "Лучше не найти влагалища,\nчем очко товарища."],
  "соси": [/соси*/, "Отсоси", "Ну раньше был я трактористом...", "Я дед да сосу", "Сосу, да, игра такая есть", "Осу?"]
}

function findPropertyNameByRegex(o, s) {
  for (var key in o) {
    if (s.match(o[key][0])) {
      return key
    }
  }
  
  return undefined
}

module.exports = (updates) => updates.on("message", async (context, next) => {
  let {
    text
  } = context

  // TODO: Fix this
  /*text && context.isInbox && text.split(" ").forEach(async (el) => {
    let k = findPropertyNameByRegex(stops, el.toLowerCase())
    if (!k) return

    return await context.send(randomArray(stops[k]))
  })*/

  await next()
})
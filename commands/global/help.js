const { handleError } = require("../../utils")

const fs = require("fs")

exports.run = async (api, update, args, _, __, cmds) => {
  try {
    let helpText = args[0] === "en" ? "Help\n" : "Помощь\n"
    let res = ""
    
    cmds.forEach(i => {
      let a

      if (args && args[0] === "en" && i.arguments)
        a = i.arguments.split("|")[0] + " "
      else if (i.arguments)
        a = i.arguments.split("|")[1] + " "
      else
        a = ""

      let desc = args[0] ? i.description.en : i.description.ru

      res += `▫️ /${i.name} ${a}- ${desc}\n`
    })

    await update.send("📃 " + helpText + res)
  } catch (e) {
    handleError(update, e)
  }
}

exports.command = {
  "name": "help",
  "arguments": "(lang)|(язык)",
  "description": {
    "en": "Helps you find a description of the command you need",
    "ru": "Помогает найти нужную тебе команду"
  },
  "alias": [
    "помощь",
    "справка",
    "начать"
  ],
  "group": "global"
}
const { handleError } = require("../utils")

const fs = require("fs");

exports.run = async (api, update, args) => {
  try {
    fs.readdir(__dirname, async (err, items) => {
      if (err) return await update.send("Ошибочка вышла:\n", err)

      var res = [];

      items.forEach(item => {
        var i = require("./" + item).command;
        var lang = args;
        var a;

        if (lang && lang[0] === "en" && i.arguments)
          a = i.arguments.split("|")[0] + " "
        else if (i.arguments)
          a = i.arguments.split("|")[1] + " "
        else
          a = "";

        var desc = lang[0] ? i.description.en : i.description.ru;

        res += `/${i.name} ${a}- ${desc}\n`
      });

      return await update.send(res)
    });
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
  }
}
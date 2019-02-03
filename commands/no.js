const { handleError } = require("../utils")

const fs = require("fs");
const no = JSON.parse(fs.readFileSync("./no.json", "utf8"));

exports.run = (api, update, args) => {
  try {

    if (no[update.peerId]) {
      no[update.peerId] = false;
      update.send("Теперь отсюда бот будет брать сообщения")
    } else {
      no[update.peerId] = true;
      update.send("Теперь сюда бот не будет смотреть")
    }

    fs.writeFile("./no.json", JSON.stringify(no, null, 2), (err) => {
      if (err) return console.log("> [ERROR] In no.js: \n", err)
    });

  } catch (e) {
    handleError(update, e)
  }
}

exports.command = {
  "name": "no",
  "arguments": false,
  "description": {
    "en": "Will your chat be in random.js?",
    "ru": "Будет или нет диалог попадать в random.js?"
  }
}
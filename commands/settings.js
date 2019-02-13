const {
  handleError
} = require("../utils")

const DBDialog = require("../lib/DBDialog")

exports.run = async (api, update, args) => {
  try {
    const dialog = new DBDialog(update.peerId)

    if (args.length === 0) return await showSettings(update.peerId);
    else if (args[0] === "auto" || args[0] === "interval" || args[0] === "preset")
      return update.send("Используй /" + args[0] + ", чтобы поменять насторйки.")

    async function showSettings() {
      let data = await dialog.checkData()
      let interval = data.auto ? `⠀⠀⠀| (interval) - Интервал отправки сообщений: ${data.interval / 1000} секунд\n` : ""

      let res = "⚙️ Настройки\n" +
        `⠀⠀(auto) - Авто отправка сообщений: ${data.auto ? "Да" : "Нет"}\n` +
        interval +
        `⠀⠀(preset) - Пресет ролей: №${data.preset + 1}`

      return update.send(res);
    }

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
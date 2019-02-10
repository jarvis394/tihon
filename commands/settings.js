const {
  handleError
} = require("../utils")
const {
  randomArray,
  dbDialogGet,
  dbDialogSet
} = require("../utils");

exports.run = async (api, update, args) => {
  try {

    if (args.length == 0) return await showSettings(update.peerId);

    async function showSettings(peer) {
      let data = await dbDialogGet("/settings", peer);
      if (!data) {
        await dbDialogSet("/settings", peer, {
          "interval": 3600 * 1000,
          "preset": 0,
          "auto": true
        });

        data = {
          "interval": 3600 * 1000,
          "preset": 0,
          "auto": true
        }
      }

      let res = "⚙️ Настройки\n" +
        `(auto) - Авто отправка сообщений: ${data.auto ? "Да" : "Нет"}\n` +
        `⠀| (interval)${data.auto ? ` - Интервал отправки сообщений: ${data.interval / 1000} секунд\n` : ""}` +
        `(preset) - Пресет ролей: №${data.preset + 1}`

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
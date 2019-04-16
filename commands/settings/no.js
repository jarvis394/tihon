const {
  handleError
} = require("../../utils")

const DBDialog = require("../../lib/DBDialog")

exports.run = async (api, update) => {
  try {
    const dialog = new DBDialog(update.peerId)

    let state = await dialog.checkData()
    state = state.no

    if (state) {
      state = false
      update.send("Теперь отсюда бот будет брать сообщения")
    } else {
      state = true
      update.send("Теперь отсюда бот не будет брать сообщения")
    }

    dialog.update({
      no: state
    })

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
  },
  "group": "settings"
}
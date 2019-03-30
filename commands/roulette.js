const {
  handleError,
  random,
  error
} = require("../utils");

exports.run = async (api, update, args) => {
  try {
    if (random(0, 6) === 6) {
      api.messages.removeChatUser({
        "chat_id": parseInt(update.peerId) - 2000000000,
        "member_id": update.fromId
      }).catch(e => {
        if (e.code == 15) return update.send("У тебя больше прав, чем у меня, но знай, что у тебя сегодня удача на нуле!");
        return update.send("Не могу тебя забанить, но знай, что у тебя сегодня удача на нуле!");
      });
      
      return update.reply("Упс! Тебе выпала 6-ка!")
    } else {
      return update.reply("Ну, дружок, тебе повезло! Попробуешь ещё?")
    }

  } catch (e) {
    handleError(update, e);
  }
}

exports.command = {
  "name": "ban",
  "arguments": "(user)|(пользователь)",
  "description": {
    "en": "BAN USER (but only if you have special role)",
    "ru": "ЗАБАНИТЬ! Но только если у тебя есть специальная роль"
  }
}

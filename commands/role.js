const {
  handleError
} = require("../utils")

const {
  randomArray,
  writeSettings,
  getSettings
} = require("../utils");

exports.run = async (api, update, args) => {
  try {

    // Return if group mentioned (usually that's bot)
    if (args[0] && args[0].startsWith("[club")) return update.send("Группам роли не даю");

    if (args[0] == "add") return addRole();
    else if (args[0] == "remove") return removeRole();
    else if (args[0] && args[0].startsWith("[")) return showRoles(args[0].slice(1, -1).split("|")[0])
    else if (!args[0]) return showRoles(update.senderId);
    else return update.send("Не опознал");

  } catch (e) {
    handleError(update, e)
  }

  async function addRole() {


    return update.send("test")
  }

  async function removeRole() {
    return update.send("test")
  }

  async function showRoles(id) {
    let r = getSettings(id, update.peerId);
    let user = await api.users.get({
      user_ids: id,
      name_case: "gen"
    });

    r = r && r.roles ? r.roles.map(val => "🔸 " + val).join("\n") : "Пока ничего!";

    return await update.send(`Роли у ${user[0].first_name} ${user[0].last_name}:\n${r}`);
  }
}

exports.command = {
  "name": "role",
  "arguments": "(add)/(remove) *user|(add)/(remove) *user",
  "description": {
    "en": "Adds or removes role at specific user. Without add/remove shows only user's roles",
    "ru": "Добавляет или удаляет роль у пользователя. Без аргументов возвращает роли пользователя"
  }
}
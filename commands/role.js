const {
  handleError
} = require("../utils")

const {
  dbSet,
  dbUpdate,
  dbDialogGet,
  dbDialogSet
} = require("../utils");

exports.run = async (api, update, args) => {
  try {

    // Return if group mentioned (usually that's bot)
    if (args.includes(el => el.startsWith("[club"))) return update.send("Группам роли не даю");

    // Add role if a first argument is "add"
    if (args[0] == "add") return addRole();

    // Remove role if a first argument is "remove"
    else if (args[0] == "remove") return removeRole();

    // Show mentioned user's roles
    else if (args[0] && args[0].startsWith("[id")) return showRoles(args[0].slice(1, -1).split("|")[0])

    // Show user's roles
    else if (!args[0]) return showRoles(update.senderId);

    // Error if nothing mathcing
    else return update.send("Не опознал");

  } catch (e) {
    handleError(update, e)
  }

  /**
   * Add role
   */
  async function addRole() {
    let roleName = args[1]; // Role name is the second argument
    let userId = args[2] && args[2].startsWith("[id") ?  // If there is a third argument
      args[2].slice(1, -1).split("|")[0] :               // User ID is the third argument
      update.senderId;                                   // but if there isn't, userID is sender's ID

    if (!roleName) return update.send("⭕️ Не указана роль");

    let data = await dbDialogGet(userId, update.peerId);

    if (!data) await dbDialogSet(userId, update.peerId, {});

    data.roles = data.roles ? data.roles : [];
    data.roles.push(roleName);
    await dbDialogSet(userId, update.peerId, data);

    let user = await api.users.get({
      user_ids: userId,
      name_case: "gen"
    });

    let r = data && data.roles ? data.roles.map(val => "🔸 " + val).join("\n") : "Пока ничего!";

    return await update.send(`Теперь роли у ${user[0].first_name} ${user[0].last_name}:\n${r}`);
  }

  async function removeRole() {
    return update.send("test")
  }

  async function showRoles(id) {
    let r = await dbDialogGet(id, update.peerId);
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
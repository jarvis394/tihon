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
    let userId = args[2] && args[2].startsWith("[id") ? // If there is a third argument
      args[2].slice(1, -1).split("|")[0] : // User ID is the third argument
      update.senderId; // but if there isn't, userID is sender's ID

    // If no role name
    if (!roleName) return update.send("⭕️ Не указана роль");

    // Get data
    let user = await dbDialogGet(userId, update.peerId);

    if (!user) {
      await dbDialogSet(userId, update.peerId, {
        "roles": [
          "Сельчанин"
        ]
      });
      user = await dbDialogGet(userId, update.peerId);
    }

    user.roles = user.roles ? user.roles : [];
    user.roles.push(roleName);
    await dbDialogSet(userId, update.peerId, user);

    let name = await api.users.get({
      user_ids: userId,
      name_case: "gen"
    });

    let r = user && user.roles ? user.roles.map(val => "🔸 " + val).join("\n") : "Пока ничего!";

    return await update.send(`Теперь роли у ${name[0].first_name} ${name[0].last_name}:\n${r}`);
  }

  /**
   * Remove role
   */
  async function removeRole() {
    let roleName = args[1]; // Role name is the second argument
    let userId = args[2] && args[2].startsWith("[id") ? // If there is a third argument
      args[2].slice(1, -1).split("|")[0] : // User ID is the third argument
      update.senderId; // but if there isn't, userID is sender's ID

    // If no role name
    if (!roleName) return update.send("⭕️ Не указана роль");

    // Get data
    let user = await dbDialogGet(userId, update.peerId);

    if (!user) {
      await dbDialogSet(userId, update.peerId, {
        "roles": [
          "Сельчанин"
        ]
      });
      user = await dbDialogGet(userId, update.peerId);
    }

    let i = user.roles.findIndex(el => el === roleName);
    if (i !== -1) user.roles.splice(i, 1);

    await dbDialogSet(userId, update.peerId, user);

    let name = await api.users.get({
      user_ids: userId,
      name_case: "gen"
    });

    let r = user && user.roles ? user.roles.map(val => "🔸 " + val).join("\n") : "Пока ничего!";

    return await update.send(`Теперь роли у ${name[0].first_name} ${name[0].last_name}:\n${r}`);
  }

  async function showRoles(id) {
    let r = await dbDialogGet(id, update.peerId);
    let name = await api.users.get({
      user_ids: id,
      name_case: "gen"
    });

    r = r && r.roles ? r.roles.map(val => "🔸 " + val).join("\n") : "Пока ничего!";

    return await update.send(`Роли у ${name[0].first_name} ${name[0].last_name}:\n${r}`);
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
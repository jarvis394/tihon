const {
  handleError
} = require("../utils")

const DBDialog = require("../lib/DBDialog")

const emptyUserData = {
  "roles": [],
  "warns": [],
  "settings": {}
}

exports.run = async (api, update, args) => {
  const dialog = new DBDialog(update.peerId)

  try {

    // Return if group mentioned (usually that's bot)
    if (args.some(el => el.startsWith("[club"))) return update.send("Группам роли не даю")

    // Return if in dialog, not multidialog
    if (update.peerType === "user") return update.send("Мы с тобой тут с глазу на глаз")

    if (args[0] && args[0].startsWith("[id")) {

      let id = args[0].slice(1, -1).split("|")[0].slice(2)
      if (args[1] == "add") return await addRole(id, 2)
      else if (args[1] == "remove" || args[1] == "delete") return await removeRole(id, 2)
      else if (args[0]) return await showRoles(id)
      else return update.send("Не опознал")

    } else {

      let id = update.senderId

      // Add role if a first argument is "add"
      if (args[0] == "add") return await addRole(id, 1)

      // Remove role if a first argument is "remove"
      else if (args[0] == "remove" || args[0] == "delete") return await removeRole(id, 1)

      // Show user's roles
      else if (!args[0]) return await showRoles(id)

      // Error if nothing mathcing
      else return update.send("Не опознал")
    }

    /**
     * Add role
     */
    async function addRole(id, index) {
      await dialog.checkData()

      let sliceLen = index == 1 ?
        args[0].length + 1 :
        args[0].length + args[1].length + 1
      let roleName = args.join(" ").slice(sliceLen)
      let userId = id

      // If no role name
      if (!roleName) return update.send("⭕️ Не указана роль")

      // Get data
      let user = await dialog.getUser(userId)

      // No user fetched
      if (!user) {
        await dialog.setUser(userId, emptyUserData)
        user = emptyUserData
      }

      user.roles.push(roleName)
      await dialog.updateRoles(userId, user.roles)

      let name = await api.users.get({
        user_ids: userId,
        name_case: "gen"
      })

      let res = ""
      if (user && user.roles) {
        let c = 0
        user.roles.forEach(el => {
          if (el) res += "🔸 " + el + "\n", c++
        })
        if (!c) res = "🔸 Пока ничего!"
      }

      return await update.send(
        `Добавлена роль '${roleName}'\n
         Теперь роли у ${name[0].first_name} ${name[0].last_name}:\n${res}`
      )
    }

    /**
     * Remove role
     */
    async function removeRole(id, index) {
      await dialog.checkData()

      let sliceLen = index == 1 ?
        args[0].length + 1 :
        args[0].length + args[1].length + 1
      let roleName = args.join(" ").slice(sliceLen)
      let userId = id

      // If no role name
      if (!roleName) return update.send("⭕️ Не указана роль")

      // Get data
      let user = await dialog.getUser(userId)

      // No user fetched
      if (!user) {
        await dialog.setUser(userId, emptyUserData)
        user = emptyUserData
      }

      let i = user.roles.findIndex(el => el === roleName)
      if (i !== -1) user.roles.splice(i, 1)
      else return update.send("⭕️ Такой роли нет")

      await dialog.updateRoles(userId, user.roles)

      let name = await api.users.get({
        user_ids: userId,
        name_case: "gen"
      })

      let res = ""
      if (user && user.roles) {
        let c = 0
        user.roles.forEach(el => {
          if (el) res += "🔸 " + el + "\n", c++
        })
        if (!c) res = "🔸 Пока ничего!"
      }

      return await update.send(
        `Удалена роль '${roleName}'\n
         Теперь роли у ${name[0].first_name} ${name[0].last_name}:\n${res}`
      )
    }

    async function showRoles(userId) {
      await dialog.checkData()

      let user = await dialog.getUser(userId)

      // No user fetched
      if (!user) {
        await dialog.setUser(userId, emptyUserData)
        user = emptyUserData
      }

      let name = await api.users.get({
        user_ids: userId,
        name_case: "gen"
      })

      let res = ""
      if (user && user.roles) {
        let c = 0
        user.roles.forEach(el => {
          if (el) res += "🔸 " + el + "\n", c++
        })
        if (!c) res = "🔸 Пока ничего!"
      }

      return await update.send(`Роли у ${name[0].first_name} ${name[0].last_name}:\n${res}`)
    }

  } catch (e) {
    handleError(update, e)
  }
}

exports.command = {
  "name": "roles",
  "arguments": "(add)/(remove) *user|(add)/(remove) *user",
  "description": {
    "en": "Adds or removes role at specific user. Without add/remove shows only user's roles",
    "ru": "Добавляет или удаляет роль у пользователя. Без аргументов возвращает роли пользователя"
  },
  "group": "global"
}
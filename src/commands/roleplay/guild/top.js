exports.run = async (update, args) => {
  const rel = '../../../'
  const getGuildsTop = require(rel + 'utils/getGuildsTop')
  const format = require(rel + 'utils/format')
  const { CURRENCY } = require(rel + 'configs/constants')
  const User = require(rel + 'lib/User')
  const Guild = require(rel + 'lib/Guild')
  const CommandError = require(rel + 'lib/CommandError')

  const { senderId } = update
  const user = new User(senderId)
  const guildId = user.guild
  const top = await getGuildsTop()

  let res = []

  if (top.length === 0) {
    return await update.reply(
      '😯 Пока нет никаких колхозов!\n\nСоздай свой - @tihon_bot колхоз создать (имя)'
    )
  }

  top.forEach((guild, i) => {
    res.push(
      `${i + 1}. [ ID ${guild.id} ] [id${guild.creatorId}|${guild.name}]`
    )
    res.push(
      `     🏦 ${format(guild.money)} ${CURRENCY} - 💠 ${format(
        guild.reputation
      )} R`
    )
  })

  return await update.reply(res.join('\n'))
}

exports.command = {
  hidden: true,
}

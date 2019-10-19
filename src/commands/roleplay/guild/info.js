exports.run = async (update, args) => {
  const rel = '../../../'
  const User = require(rel + 'lib/User')
  const Guild = require(rel + 'lib/Guild')
  const shopData = require(rel + 'data/guildShop')
  const { GuildIsEmpty } = require(rel + 'errors/User')
  const moment = require('moment')

  moment.locale('ru')

  const { senderId } = update
  const user = new User(senderId)
  const guildId = user.guild

  // Return if guild is empty
  if (!guildId) {
    return update.reply(GuildIsEmpty(guildId))
  }

  // Get info
  const guild = new Guild(guildId)
  const name = guild.name
  const money = guild.money
  const reputation = guild.reputation
  const members = guild.getFilteredMembers()
  const stats = guild.stats
  const population = guild.population
  const shield = guild.shield

  let res = [
    `📜 Информация о колхозе "${name}":\n`,
    `🌐 ID: ${guildId}`,
    `💠 Репутация: ${reputation} R`,
    `🏦 Казна: ${money} ₮`,
    `📊 Статистика: ${stats.wins} W | ${stats.loses} L`,
    `👥 В колхозе состоит ${members.length}/50 человек\n`,
  ]

  if (shield) {
    res.push(`🛡️ Действие щита закончится ${moment(shield).fromNow()}`)
  }

  res.push('')
  for (let group in population) {
    const i = shopData.find(e => e.group === group)

    res.push(`${i.icon} ${i.accName} - ${population[group]} / 100`)
  }

  return update.reply(res.join('\n'))
}

exports.command = {
  hidden: true,
}

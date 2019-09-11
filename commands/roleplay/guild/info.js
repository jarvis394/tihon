exports.run = async (update, args) => {
  const rel = '../../../'
  const User = require(rel + 'lib/User')
  const Guild = require(rel + 'lib/Guild')
  const CommandError = require(rel + 'lib/CommandError')
  const moment = require('moment')

  moment.locale('ru')

  const { senderId } = update
  const user = new User(senderId)
  const guildId = await user.fetchGuild()

  // Return if guild is empty
  if (!guildId) {
    throw new CommandError(
      '😕 Ты не состоишь в колхозе\n\n' +
        'Глава колхоза может пригласить тебя командой /колхоз пригласить [id]',
      'User_GuildIsEmpty'
    )
  }

  // Get info
  const guild = new Guild(guildId)
  const data = await guild.fetchData()
  const name = await guild.getName()
  const money = await guild.getMoney()
  const reputation = await guild.getReputation()
  const members = await guild.getFilteredMembers()
  const stats = await guild.getStats()

  const text =
    `📜 Информация о колхозе "${name}":\n\n` +
    `🌐 ID: ${data.id}\n` +
    `💠 Репутация: ${reputation} R\n` +
    `🏦 Казна: ${money} ₮\n` +
    `📊 Статистика: ${stats.win} W | ${stats.lose} L\n` +
    `👥 В колхозе состоит ${members.length}/50 человек\n\n` +
    `🛡️ Щит доступен до: ${moment(data.shield).calendar()}`

  return update.reply(text)
}

exports.command = {
  hidden: true,
}

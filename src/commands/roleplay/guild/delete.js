exports.run = async (update, args) => {
  const rel = '../../../'
  const User = require(rel + 'lib/User')
  const Guild = require(rel + 'lib/Guild')
  const CommandError = require(rel + 'lib/CommandError')

  const { senderId } = update
  const user = new User(senderId)
  const guildId = user.guild

  // Return if guild is empty
  if (!guildId) {
    return update.reply(
      '😕 Ты не состоишь в колхозе\n\n' +
        'Глава колхоза может пригласить тебя командой /колхоз пригласить [id]'
    )
  }

  const guild = new Guild(guildId)
  const name = guild.name
  const members = guild.members
  const guildUser = guild.getMember(senderId)

  if (!guild.exists()) {
    throw new CommandError(
      `Колхоз с ID "${guildId}" не найден`,
      'Guild_NotFound'
    )
  }

  if (guildUser.role !== 3) {
    return await update.reply('🔻 Ты не являешься создателем колхоза')
  }

  const userName = await user.getFullName()

  guild.delete()

  return await update.reply(
    `✨ [id${senderId}|${userName}] распустил колхоз "${name}`
  )
}

exports.command = {
  hidden: true,
}

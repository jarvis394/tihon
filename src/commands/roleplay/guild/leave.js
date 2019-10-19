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
  const members = guild.members
  const guildUser = guild.getMember(senderId)

  if (!guild.exists()) {
    throw new CommandError(
      `Колхоз с ID "${guildId}" не найден`,
      'Guild_NotFound'
    )
  }

  if (guildUser.role === 3) {
    throw new CommandError(
      'Ты не можешь покинуть колхоз, так как являешься его создателем.\n\n' +
        'Используй команду "/колхоз распустить", чтобы распустить колхоз и выйти из него',
      'User_IsGuildCreator'
    )
  }

  const userName = await user.getFullName()

  guild.removeMember(senderId)

  return update.reply(
    `✨ [id${senderId}|${userName}] покинул колхоз по своей воле!`
  )
}

exports.command = {
  hidden: true,
}

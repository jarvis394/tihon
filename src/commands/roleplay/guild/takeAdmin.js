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
  const members = guild.getFilteredMembers()
  const guildUser = guild.getMember(senderId)

  if (!guild.exists()) {
    throw new CommandError(
      `Колхоз с ID "${guildId}" не найден`,
      'Guild_NotFound'
    )
  }

  // Check for admin role
  if (guildUser.role !== 3) {
    throw new CommandError(
      'Вы не являетесь создателем этого колхоза!',
      'User_MissingRole'
    )
  }

  // Get member's ID from arguments
  let memberId
  try {
    memberId = parseInt(args[1].split('|')[0].slice(3))
  } catch (e) {
    throw new CommandError(
      'Упомяни человека, у которого хочешь отобрать роль управляющего',
      'Argument_InvalidMention'
    )
  }

  // Self check
  if (memberId === senderId) {
    throw new CommandError(
      'Нельзя отбирать у себя роль!',
      'Argument_MentionIsSelf'
    )
  }

  // Find member in guild
  const guildMember = guild.getMember(memberId)

  // If member not found in guild
  if (!guildMember) {
    throw new CommandError('Человек не найден.', 'Guild_MemberNotFound')
  }

  const member = new User(memberId)
  const memberName = await member.getFullName()
  const userName = await user.getFullName('acc')

  guild.changeRole(memberId, 1)

  return update.reply(
    `✨ [id${memberId}|${memberName}] был снят с должности по воле [id${senderId}|${userName}]!`
  )
}

exports.command = {
  hidden: true,
}

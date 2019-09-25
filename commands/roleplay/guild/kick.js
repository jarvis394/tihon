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
    throw new CommandError(
      '😕 Ты не состоишь в колхозе\n\n' +
        'Глава колхоза может пригласить тебя командой /колхоз пригласить [id]',
      'User_GuildIsEmpty'
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

  // Check for admin role
  if (guildUser.role < 2) {
    throw new CommandError(
      'Вы не являетесь управляющим в этом колхозе',
      'User_MissingRole'
    )
  }

  // Get member's ID from arguments
  let memberId
  try {
    memberId = parseInt(args[1].split('|')[0].slice(3))
  } catch (e) {
    throw new CommandError(
      'Упомяни человека, которого хочешь убрать',
      'Argument_InvalidMention'
    )
  }

  // Self check
  if (memberId === senderId) {
    throw new CommandError(
      'Ты можешь выйти из колхоза командой /колхоз выйти',
      'Argument_MentionIsSelf'
    )
  }

  // Find member in guild
  const guildMember = guild.members.find(e => e.id === memberId)

  // If member not found in guild
  if (!guildMember) {
    throw new CommandError('Человек не найден.', 'Guild_MemberNotFound')
  }

  if (guildMember.role >= guildUser.role) {
    throw new CommandError(
      'Нельзя выгнать человека с ролью, такой же, как у тебя и выше',
      'Guild_MissingPrivileges'
    )
  }

  const member = new User(memberId)
  const memberName = await member.getFullName()
  const userName = await user.getFullName('acc')

  guild.removeMember(memberId)

  return update.reply(
    `✨ [id${memberId}|${memberName}] был изгнан из колхоза по воле [id${senderId}|${userName}]!`
  )
}

exports.command = {
  hidden: true,
}

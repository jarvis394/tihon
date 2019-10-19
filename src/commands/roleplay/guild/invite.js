exports.run = async (update, args) => {
  const rel = '../../../'
  const User = require(rel + 'lib/User')
  const Guild = require(rel + 'lib/Guild')
  const CommandError = require(rel + 'lib/CommandError')
  const { api } = require(rel + 'globals')

  if (!args[1] || (args[1] && !args[1].startsWith('[id'))) {
    throw new CommandError('Упомяни человека', 'Argument_MissingField')
  }

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

  if (!guild.exists()) {
    throw new CommandError(
      `Ты состоишь в несуществующем колхозе "${guildId}"!`,
      'Guild_NotFound'
    )
  }

  let invId
  try {
    invId = parseInt(args[1].split('|')[0].slice(3))
  } catch (e) {
    return update.reply('🔻 Упомяни человека')
  }

  const userRole = guild.getMember(senderId).role
  const member = members.find(e => e.id === invId)
  const userMember = new User(invId)

  if (userRole < 2) {
    throw new CommandError(
      'Только управляющие колхозом могут приглашать людей',
      'User_MissingRole'
    )
  }

  if (member) {
    if (member.role < 1) {
      throw new CommandError(
        'Этот человек уже приглашён в ваш колхоз!',
        'Guild_MemberAlreadyInvited'
      )
    } else {
      throw new CommandError(
        'Этот человек уже состоит в вашем колхозе!',
        'Guild_MemberAlreadyIn'
      )
    }
  }

  if (members.filter(e => e.role < 1).length >= 50) {
    return update.reply(
      '🔻 В колхозе может быть приглашено максимум 50 человек'
    )
  }

  try {
    await api.messages.send({
      peer_id: invId,
      message:
        `✉️ Вы получили приглашение в колхоз "${guild.name}" [ ${guild.id} ]\n` +
        `🔸 Чтобы принять приглашение, напишите \n\n@tihon_bot, колхоз принять ${guild.id}`,
    })
  } catch (e) {
    await update.reply(
      `❌ Ошибка при отправке приглашения. \nОн всё равно может принять приглашение через /колхоз принять ${guildId} \n` +
        'Попросите этого человека открыть доступ к сообщениям или добавить бота в друзья.\n\n' +
        `Ошибка: ${e.message}`
    )
  }

  guild.addMember(invId, 0)
  userMember.setGuild(null)

  return update.reply(
    `📨 [id${invId}|${await userMember.getFullName()}] был приглашен в колхоз.`
  )
}

exports.command = {
  hidden: true,
}

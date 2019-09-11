exports.run = async (update, args) => {
  const rel = '../../../'
  const User = require(rel + 'lib/User')
  const Guild = require(rel + 'lib/Guild')
  const CommandError = require(rel + 'lib/CommandError')
  const { api } = require(rel + 'variables')

  if (!args[1] || (args[1] && !args[1].startsWith('[id'))) {
    throw new CommandError('Упомяни человека', 'Argument_MissingField')
  }

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

  const guild = new Guild(guildId)
  const data = await guild.fetchData()
  const members = await guild.getMembers()

  if (!data) {
    throw new CommandError(
      `Ты состоишь в несуществующем колхозе "${guildId}"!`,
      'Guild_NotFound'
    )
  }

  let invId
  try {
    invId = parseInt(args[1].split('|')[0].slice(3))
  } catch (e) {
    return update.reply('Упомяни человека', 'Argument_InvalidMention')
  }

  const userRole = members.find(e => e.id === senderId)
  const member = members.find(e => e.id === invId)

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

  try {
    await api.messages.send({
      peer_id: invId,
      message:
        `✉️ Вы получили приглашение в колхоз "${data.name}" [ ${data.id} ]\n` +
        `🔸 Чтобы принять приглашение, напишите \n\n@tihon_bot, колхоз принять ${data.id}`,
    })
  } catch (e) {
    update.reply(
      `❌ Ошибка при отправке приглашения. \nОн всё равно может принять приглашение через /колхоз принять ${guildId} \n` +
        'Попросите этого человека открыть доступ к сообщениям или добавить бота в друзья.\n\n' +
        `Ошибка: ${e.message}`
    )
  }

  await guild.addMember(invId, 0)

  return update.reply(`📨 ID ${invId} был приглашен в колхоз.`)
}

exports.command = {
  hidden: true,
}

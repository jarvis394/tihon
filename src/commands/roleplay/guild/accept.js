exports.run = async (update, args) => {
  const rel = '../../../'
  const User = require(rel + 'lib/User')
  const Guild = require(rel + 'lib/Guild')
  const { GuildNotEmpty } = require(rel + 'errors/User')
  const { NotFound } = require(rel + 'errors/Guild')
  const CommandError = require(rel + 'lib/CommandError')

  if (!args[1]) {
    return update.reply('🔻 Укажи ID колхоза')
  }

  const { senderId } = update
  const guildId = args[1]
  const user = new User(senderId)
  const userGuild = user.guild

  if (userGuild) {
    return update.reply(GuildNotEmpty(userGuild))
  }

  const guild = new Guild(guildId)
  const data = await guild.members

  if (!data) {
    return update.reply(NotFound(guildId))
  }

  const member = data.find(e => e.id === senderId)

  if (!member) {
    throw new CommandError('Вас сюда не приглашали', 'Guild_MemberNotInvited')
  }

  if (member.role > 0) {
    throw new CommandError(
      'Вы уже состоите в этом колхозе',
      'Guild_MemberAlreadyIn'
    )
  }

  if (data.filter(e => e.role > 0).length >= 50) {
    return update.reply('🔻 В колхозе может быть максимум 50 человек')
  }

  guild.changeRole(senderId, 1)

  user.setGuild(guildId)

  return update.reply(`✅ Ты был принят в колхоз "${guild.name}"`)
}

exports.command = {
  hidden: true,
}

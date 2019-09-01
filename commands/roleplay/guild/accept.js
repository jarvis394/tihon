exports.run = async (api, update, args) => {
  const rel = '../../../'
  const handleError = require(rel + 'utils/handleError')
  const User = require(rel + 'lib/User')
  const Guild = require(rel + 'lib/Guild')
  const CommandError = require(rel + 'lib/CommandError')
  
  try {
    
    if (!args[1]) {
      throw new CommandError('Укажи ID колхоза', 'Argument_MissingField')
    }
    
    const { senderId } = update
    const guildId = args[1]
    const user = new User(senderId)
    const userGuild = await user.fetchGuild()
    
    if (userGuild) {
      throw new CommandError('Ты уже состоишь в колхозе с ID "' + userGuild + '"\n\n' + 
        'Сначала выйди из него, а потом принимай приглашение.', 'User_GuildNotEmpty')
    }
    
    const guild = new Guild(guildId)
    const data = await guild.getMembers()
    
    if (!data) {
      throw new CommandError(`Колхоз с ID "${guildId}" не найден`, 'Guild_NotFound')
    }
    
    const member = data.find(e => e.id === senderId)
    
    if (!member) {
      throw new CommandError('Вас сюда не приглашали', 'Guild_MemberNotInvited')
    }
    
    if (member.role > 0) {
      throw new CommandError('Вы уже состоите в этом колхозе', 'Guild_MemberAlreadyIn')
    }
    
    await guild.changeRole(senderId, 1)
    
    await user.setGuild(guildId)
    
    return update.reply(`✅ ID ${senderId} был принят в колхоз.`)
    
  } catch (e) {
    handleError(update, e)
  }
}

exports.command = {
  'hidden': true
}
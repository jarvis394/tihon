exports.run = async (api, update, args) => {
  const rel = '../../../'
  const handleError = require(rel + 'utils/handleError')
  const User = require(rel + 'lib/User')
  const Guild = require(rel + 'lib/Guild')
  const CommandError = require(rel + 'lib/CommandError')
  
  try {
    
    const { senderId } = update
    const user = new User(senderId)
    const guildId = await user.fetchGuild()
    
    // Return if guild is empty
    if (!guildId) {
      throw new CommandError('😕 Ты не состоишь в колхозе\n\n' + 
        'Глава колхоза может пригласить тебя командой /колхоз пригласить [id]', 'User_GuildIsEmpty')
    }
    
    const guild = new Guild(guildId)
    const data = await guild.fetchData()
    const members = await guild.fetchMembers()
    const guildUser = members.find(e => e.id === senderId)
    
    if (!data) {
      throw new CommandError(`Колхоз с ID "${guildId}" не найден`, 'Guild_NotFound')
    }
    
    if (guildUser.role === 3) {
      throw new CommandError('Ты не можешь покинуть колхоз, так как являешься его создателем.\n\n' +
        'Используй команду "/колхоз распустить", чтобы распустить колхоз и выйти из него')
    }
    
    const userName = await user.getFullName()
    
    await guild.removeMember(senderId)
    await user.pushGuildId(null)
    
    return update.reply(`✨ [id${senderId}|${userName}] покинуо колхоз по своей воле!`)
    
  } catch (e) {
    handleError(update, e)
  }
}

exports.command = {
  'hidden': true
}
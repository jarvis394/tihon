exports.run = async (api, update, args) => {
  const rel = '../../../'
  const handleError = require(rel + 'utils/handleError')
  const getTopGuilds = require(rel + 'utils/getTopGuilds')
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
    
    // Get info
    const guild = new Guild(guildId)
    const data = await guild.fetchData()
    
    if (!data) {
      throw new CommandError(`Колхоз с ID "${guildId}" не найден.`, 'Guild_NotFound')
    }
    
    console.log(await getTopGuilds())
    
  } catch (e) {
    handleError(update, e)
  }
}

exports.command = {
  'hidden': true
}
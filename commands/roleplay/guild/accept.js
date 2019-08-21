exports.run = async (api, update, args) => {
  const rel = '../../../'
  const handleError = require(rel + 'utils/handleError')
  const User = require(rel + 'lib/User')
  const Guild = require(rel + 'lib/Guild')
  const { firebase } = require(rel + 'variables')
  const db = firebase.firestore()
  
  try {
    
    if (!args[1]) {
      return update.reply('🔻 Укажи ID колхоза')
    }
    
    const { senderId } = update
    const guildId = args[1]
    const user = new User(senderId)
    const userGuild = await user.fetchGuild()
    const guild = new Guild(guildId)
    const data = await guild.fetchData()
    const member = data.members.find(e => e.id === senderId)
    
    if (!member) {
      return update.reply('🔻 Вы сюда не приглашали.')
    }
    
    if (member.role !== 0) {
      return update.reply('🔻 Вы уже состоите в этом колхозе')
    }
    
    await guild.changeRole(senderId, 1)
    
    return update.reply(`✅ ID ${senderId} был принят в колхоз.`)
    
  } catch (e) {
    handleError(update, e)
  }
}

exports.command = {
  'hidden': true
}
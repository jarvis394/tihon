exports.run = async (api, update, args) => {
  const rel = '../../../'
  const handleError = require(rel + 'utils/handleError')
  const User = require(rel + 'lib/User')
  const Guild = require(rel + 'lib/Guild')
  const { firebase } = require(rel + 'variables')
  const db = firebase.firestore()
  
  try {
    
    if (!args[1] || (args[1] && !args[1].startsWith('[id'))) {
      return update.reply('🔻 Упомяни человека')
    }
    
    const { senderId } = update
    const user = new User(senderId)
    const guildId = await user.fetchGuild()
    const guild = new Guild(guildId)
    const data = await guild.fetchData()
    const invId = args[1].split('|')[0].slice(3)
    const userRole = data.members.find(e => e.id === senderId)
    
    if (userRole < 2) {
      return update.reply('🔻 Только управляющие колхозом могут приглашать людей')
    }
    
    if (data.members.some(e => e.id === invId)) {
      return update.reply('🔻 Этот человек уже состоит в вашем колхозе!')
    }
    
    try {
      await api.messages.send({
        peer_id: invId,
        message: `✉️ Вы получили приглашение в колхоз "${data.name}" [ ${data.id} ]\n\n` + 
          `Чтобы принять приглашение, напишите @tihon_bot, колхоз принять ${data.id}`
      })
    } catch (e) {
      update.reply(`❌ Ошибка при отправке приглашения. \nОн всё равно может принять приглашение через /колхоз принять ${guildId} \n` +
                          'Попросите этого человека открыть доступ к сообщениям или добавить бота в друзья.\n\n' +
                          `Ошибка: ${e.message}`)
    }
    
    await guild.addMember(invId, 0)
    
    return update.reply(`📨 ID ${invId} был приглашен в колхоз.`)
    
  } catch (e) {
    handleError(update, e)
  }
}

exports.command = {
  'hidden': true
}
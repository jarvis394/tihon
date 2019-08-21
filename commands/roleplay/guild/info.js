exports.run = async (api, update, args) => {
  const rel = '../../../'
  const handleError = require(rel + 'utils/handleError')
  const User = require(rel + 'lib/User')
  const { firebase } = require(rel + 'variables')
  const db = firebase.firestore()
  const moment = require('moment')
  
  moment.locale('ru')
  
  try {
    
    const { senderId } = update
    const user = new User(senderId)
    const guildId = await user.fetchGuild()
    
    // Return if guild is empty
    if (!guildId) return update.reply('😕 Ты не состоишь в колхозе\n\nГлава колхоза может пригласить тебя командой /колхоз пригласить [id]')
    
    // Get info
    let data = {}
    await db
      .collection('guilds')
      .doc(guildId)
      .get()
      .then(d => (data = d.data()))
    
    const text = `📜 Информация о колхозе "${data.name}":\n\n` +
          `🌐 ID: ${data.id}\n` +
          `💠 Репутация: ${data.reputation} R\n` +
          `💲 Казна: ${data.money} ₮\n` + 
          `📊 Статистика: ${data.stats.win} W | ${data.stats.lose} L\n` +
          `👥 В колхозе состоит ${data.members.filter(e => e.role !== 0).length}/50 человек\n\n` +
          `🛡️ Щит доступен до: ${moment(data.shield).calendar()}`
    
    return update.reply(text)
    
  } catch (e) {
    handleError(update, e)
  }
}

exports.command = {
  'hidden': true
}
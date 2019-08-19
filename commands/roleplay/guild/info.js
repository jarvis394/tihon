exports.run = async (api, update, args) => {
  const rel = '../../../'
  const handleError = require(rel + 'utils/handleError')
  const User = require(rel + 'lib/User')
  const { firebase } = require(rel + 'variables')
  const db = firebase.firestore()
  
  try {
    
    const { senderId } = update
    const user = new User(senderId)
    const guildId = await user.fetchGuild()
    
    // Return if guild is empty
    if (!guildId) return update.reply('You don\'t have any guild!')
    
    // Get info
    let data = {}
    await db
      .collection('guilds')
      .doc(guildId)
      .get()
      .then(d => (data = d.data()))
    
    const text = `Guild "${data.name}":\n` +
          `ID: ${data.id}\n` +
          `Reputation: ${data.reputation} R\n` +
          `Money: ${data.money}`
    return update.reply(text)
    
  } catch (e) {
    handleError(update, e)
  }
}

exports.command = {
  'hidden': true
}
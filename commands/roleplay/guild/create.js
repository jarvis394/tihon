exports.run = async (api, update, args) => {
  const rel = '../../../'
  const handleError = require(rel + 'utils/handleError')
  const User = require(rel + 'lib/User')
  const thinid = require('thinid')
  const { firebase } = require(rel + 'variables')
  const db = firebase.firestore()
  
  try {
        
    const name = args[1]
    
    // Check for name
    if (!name) return update.reply('Enter guild\'s name')
    
    const now = Date.now()
    const { senderId } = update
    const user = new User(senderId)
    const guildId = thinid(4)
    const guildData = {
      id: guildId,
      name: name,
      members: [ { id: senderId, role: 3 } ],
      reputation: 0,
      stats: {
        win: 0,
        lose: 0
      },
      money: 0,
      shield: now,
      timeout: 0,
      population: {
        farmers: 0,
        peasants: 0,
        workers: 0
      },
      items: []
    }
    
    // Write entry for guild
    db.collection('guilds').doc(guildId).set(guildData)
    
    // Set guild for user
    user.setGuild(guildId)
    
    return update.reply('Guild "' + name + '" with ID ' + guildId + ' has been successfuly created.')
    
  } catch (e) {
    handleError(update, e)
  }
}

exports.command = {
  'hidden': true
}
exports.run = async (api, update, args) => {
  const rel = '../../../'
  const handleError = require(rel + 'utils/handleError')
  const User = require(rel + 'lib/User')
  const thinid = require('thinid')
  const { firebase } = require(rel + 'variables')
  const db = firebase.firestore()
  const GUILD_PRICE = 100000
  
  try {
        
    const name = args[1]
    const now = Date.now()
    const { senderId } = update
    const user = new User(senderId)
    const guild = await user.fetchGuild()
    
    // Check for current guild
    if (guild) return update.reply(`🙁 Ты уже состоишь в колхозе [ ${guild} ]\n\nСначала выйди из колхоза, а затем создавай свой!`)
    
    // Check for name
    if (!name) return update.reply('🖍️ Введи имя колхоза\n\nДля просмотра справки: *tihon_bot, колхоз помощь')
    
    // Check for length
    if (name.length > 16) return update.reply('🔻 Введи имя покороче (макс. 16)')
    
    // Check for money
    const { state, amount } = await user.isEnoughFor(GUILD_PRICE)
    
    if (!state) {
      return update.send(
        '🧮 Недостаточно денег - у тебя ' +
          + amount +
          ' ₮, а нужно ' +
          GUILD_PRICE +
          ' ₮'
      )
    }
    
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
      shield: now + 3600 * 12 * 1000,
      timeout: 0,
      population: {
        farmers: 0,
        peasants: 0,
        workers: 0
      }
    }
    
    // Write entry for guild
    db.collection('guilds').doc(guildId).set(guildData)
    
    // Set guild for user
    user.setGuild(guildId)
    
    // Subtract user's money amount
    user.subtract(GUILD_PRICE)
    
    // Reply a message
    return update.reply('✨ Колхоз с названием "' + name + '" был успешно создан. \n🌐 ID колхоза: ' + guildId)
    
  } catch (e) {
    handleError(update, e)
  }
}

exports.command = {
  'hidden': true
}
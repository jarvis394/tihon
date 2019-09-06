exports.run = async (update, args) => {
  const rel = '../../../'
  const handleError = require(rel + 'utils/handleError')
  const User = require(rel + 'lib/User')
  const CommandError = require(rel + 'lib/CommandError')
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
    if (guild) {
      throw new CommandError(`🙁 Ты уже состоишь в колхозе [ ${guild} ]\n\n` +
        'Сначала выйди из колхоза, а затем создавай свой!', 'User_GuildNotEmpty')
    }
    
    // Check for name
    if (!name) {
      throw new CommandError('🖍️ Введи имя колхоза\n\n' +
        'Для просмотра справки: *tihon_bot, колхоз помощь', 'Argument_MissingField')
    }
    
    // Check for length
    if (name.length > 16) { 
      throw new CommandError('🔻 Введи имя покороче (макс. 16)', 'Argument_TooLong')
    }
    
    // Check for money
    const { state, amount } = await user.isEnoughFor(GUILD_PRICE)
    
    if (!state) {
      throw new CommandError(
        '🧮 Недостаточно денег - у тебя ' +
          + amount +
          ' ₮, а нужно ' +
          GUILD_PRICE +
          ' ₮',
        'User_InsufficientFunds'
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
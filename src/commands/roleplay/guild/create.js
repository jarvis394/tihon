exports.run = async (update, args) => {
  const rel = '../../../'
  const User = require(rel + 'lib/User')
  const Guild = require(rel + 'lib/Guild')
  const { db, log } = require(rel + 'globals')
  const GUILD_PRICE = 100000

  const { GuildNotEmpty } = require(rel + 'errors/User')

  const name = args.slice(1).join(' ')
  const now = Date.now()
  const { senderId } = update
  const user = new User(senderId)
  const userGuild = user.guild

  // Check for current guild
  if (userGuild) {
    return update.reply(GuildNotEmpty(guild))
  }

  // Check for name
  if (!name) {
    return update.reply(
      '🖍️ Введи имя колхоза\n\n' +
        'Для просмотра справки: *tihon_bot, колхоз помощь'
    )
  }

  // Check for length
  if (name.length > 16) {
    return update.reply('🔻 Введи имя покороче (макс. 16)')
  }

  // Check for money
  const { state, amount } = await user.isEnoughFor(GUILD_PRICE)

  if (!state) {
    return update.reply(
      '🧮 Недостаточно денег - у тебя ' +
        +amount +
        ' ₮, а нужно ' +
        GUILD_PRICE +
        ' ₮'
    )
  }

  const guildData = {
    name: name,
    reputation: 0,
    wins: 0,
    loses: 0,
    money: 0,
    shield: now + 3600 * 12 * 1000,
    timeout: null,
    creatorId: user.id,
  }

  // Try writing entry for the guild
  let id
  try {
    const { lastInsertRowid } = db
      .prepare(
        'INSERT INTO main.guilds (name, creatorId, money, reputation, wins, loses, shield, timeout) VALUES (@name, @creatorId, @money, @reputation, @wins, @loses, @shield, @timeout);'
      )
      .run(guildData)
    id = lastInsertRowid
  } catch (e) {
    log.error(e)
    return await update.reply(
      '🔻 Не удалось записать данные в базу:\n\n' + e.message
    )
  }

  const guild = new Guild(id)

  // Add member to the list
  guild.addMember(senderId, 3)

  // Set guild for user
  user.setGuild(id)

  // Subtract user's money amount
  user.subtract(GUILD_PRICE)

  // Reply a message
  return update.reply(
    '✨ Колхоз с названием "' +
      name +
      '" был успешно создан. \n🌐 ID колхоза: ' +
      id
  )
}

exports.command = {
  hidden: true,
}

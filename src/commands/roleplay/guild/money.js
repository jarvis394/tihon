exports.run = async (update, args) => {
  const rel = '../../../'
  const format = require(rel + 'utils/format')
  const User = require(rel + 'lib/User')
  const Guild = require(rel + 'lib/Guild')
  const CommandError = require(rel + 'lib/CommandError')

  const { senderId } = update
  const user = new User(senderId)
  const guildId = user.guild

  // Return if guild is empty
  if (!guildId) {
    return update.reply(
      '😕 Ты не состоишь в колхозе\n\n' +
        'Глава колхоза может пригласить тебя командой /колхоз пригласить [id]'
    )
  }

  // Get info
  const guild = new Guild(guildId)

  if (!guild.exists()) {
    throw new CommandError(
      `Колхоз с ID "${guildId}" не найден.`,
      'Guild_NotFound'
    )
  }

  const name = guild.name
  const money = guild.money

  if (args[1]) {
    const amount = parseInt(args[1], 10)

    if (isNaN(amount)) {
      throw new CommandError('Введи число', 'Argument_InvalidType')
    }

    if (amount <= 0) {
      throw new CommandError(
        'Введи число, которое будет больше нуля',
        'Argument_InvalidNumber'
      )
    }

    const { state, amount: userAmount } = await user.isEnoughFor(amount)

    if (!state) {
      throw new CommandError(
        '🧮 Недостаточно денег - у тебя ' +
          +format(userAmount) +
          ' ₮, а нужно ' +
          format(amount) +
          ' ₮',
        'User_InsufficientFunds'
      )
    }

    guild.addMoney(amount)
    user.subtract(amount)

    return update.reply(
      `✨ В казну колхоза переведено ${format(amount)} ₮ участником [id${
        user.id
      }|${await user.getFullName('ins')}]\n\n🏦 Всего: ${format(
        amount + money
      )} ₮`
    )
  }

  return update.reply(
    `В казне колхоза "${name}" [ ${guildId} ]:\n` + `🏦 ${format(money)} ₮`
  )
}

exports.command = {
  hidden: true,
}

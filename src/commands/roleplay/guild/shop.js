exports.run = async (update, args) => {
  const rel = '../../../'
  const format = require(rel + 'utils/format')
  const User = require(rel + 'lib/User')
  const Guild = require(rel + 'lib/Guild')
  const CommandError = require(rel + 'lib/CommandError')
  const { CURRENCY } = require(rel + 'configs/constants')
  const shopData = require(rel + 'data/guildShop')

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

  if (!args[1]) return await showMenu()
  else return await buy(args[1])

  async function showMenu() {
    let res = ['📃 ' + (await user.getName().first_name) + ', магазин:']

    for (const item of shopData) {
      res.push(`[ ${item.id} ] ${item.icon} ${item.name}`)
      res.push(
        `   - ${format(item.price)} ${CURRENCY} ${
          item.group !== 'shield'
            ? `| 💠 ${item.rep} R | ⬆️ ${item.boost} S`
            : ' - 24h'
        }`
      )
    }

    res.push()
    res.push('Чтобы купить что-либо из магазина, напишите [ ID] и количество:')
    res.push('@tihon_bot, колхоз магазин 1 15')

    return await update.reply(res.join('\n'))
  }

  async function buy(id) {
    id = parseInt(id)

    const item = shopData.find(e => e.id === id)

    if (!item) {
      throw new CommandError(
        'Предмет с ID ' + id + ' не найден',
        'Item_NotFound'
      )
    }

    let quantity = parseInt(args[2]) || 1

    if (isNaN(quantity) || quantity <= 0) {
      throw new CommandError('Введи количество (>0)', 'Argument_NotNumber')
    }

    const population = guild.population[item.group]

    if (item.group !== 'shield' && quantity > 100 - population) {
      quantity = 100 - population
    }

    const price = item.price * quantity
    const rep = item.rep * quantity

    if (money - price < 0) {
      return update.reply(
        '🧮 Недостаточно денег - у колхоза ' +
          +format(money) +
          ' ₮, а нужно ' +
          format(price) +
          ' ₮'
      )
    }

    if (item.group === 'shield') {
      if (guild.shield) {
        return update.reply('🔻 У колхоза уже есть щит')
      } else {
        guild.setShield(Date.now() + 24 * 3600 * 1000 * quantity)
      }
    } else {
      if (guild.population[item.group] >= 100) {
        return update.reply(
          '🔻 В колхозе может быть максимум 100 ' + item.accName.toLowerCase()
        )
      } else {
        guild.addPopulation(item.group, quantity)
      }
    }

    guild.subtractMoney(price)
    guild.addReputation(rep)

    return await update.reply(
      `✨ Колхоз приобрёл x${quantity} ${item.name} за ${format(
        price
      )} ${CURRENCY}`
    )
  }
}

exports.command = {
  hidden: true,
}

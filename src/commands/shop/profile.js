exports.run = async ({ update, args }) => {
  const User = require('../../lib/models/User')
  const Guild = require('../../lib/models/Guild')

  const { USERS } = require('../../configs/blacklist')

  const shopData = require('../../data/shop')
  const shopUtils = require('../../utils/shop')

  let { senderId } = update
  let userId = args[0] ? args[0].split('|')[0].slice(3) : senderId

  if (userId < 0) {
    return update.reply('🔻 Нельзя посмотреть профиль группы')
  }

  let user = new User(userId)
  let name = await user.getName('nom')
  let res = [`${name.first_name}, твой профиль:\n`]
  let items = user.items
  let guild = new Guild(user.guild)
  let balance = user.money
  let rank = user.reputation
  let pet = user.pet
  const place = user.getTopPlace()

  if (USERS.some(e => e === userId.toString()))
    return update.reply('😠 Этот пользователь заблокирован')

  // Balance
  res.push(
    '🏦 Баланс: ' + new Intl.NumberFormat('en-IN').format(balance) + ' ₮'
  )

  // Reputation
  res.push(
    '💠 Репутация: ' + new Intl.NumberFormat('en-IN').format(rank) + ' R'
  )

  // Guild
  if (user.guild && guild.exists())
    res.push(`👥 Колхоз: ${guild.name} [ ${guild.id} ]`)

  res.push('')

  shopData.groups.forEach(group => {
    const i = items[group.title]

    // No items found
    if (!i) {
      return
    }

    const item = shopUtils.getItemById(i.id)

    // If there is item
    if (item) {
      // Push group text
      res.push(
        `${group.icon} ${group.profileName}: ${item.name}${
          item.earning ? ' - ' + item.earning + ' ₮/12h' : ''
        }`
      )
    }
  })

  // If there is pet
  if (pet) {
    // Push pet's text
    const petData = shopUtils.getPetById(pet.id)
    res.push(`👣 Питомец: ${petData.icon} ${petData.name}`)
  }

  res.push(`\n🏆 В топе на ${place == null ? '>100' : place}-м месте`)

  // Send result to the user
  update.reply(res.join('\n'))
}

exports.command = {
  arguments: false,
  description: {
    en: 'Shows user\'s profile',
    ru: 'Показывает профиль пользователя',
  },
  alias: ['профиль'],
}

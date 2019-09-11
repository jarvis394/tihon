exports.run = async ({ update, args }) => {
  const User = require('../../lib/User')

  const { USERS } = require('../../configs/blacklist')

  const shopData = require('../../data/shop')
  const shopUtils = require('../../utils/shop')

  let { senderId } = update
  let userId = args[0] ? args[0].split('|')[0].slice(3) : senderId
  let user = new User(userId)
  let name = await user.getName('nom')
  let res = [`${name.first_name}, твой профиль:\n`]
  let items = user.items
  let balance = user.money
  let rank = user.reputation
  let pets = user.pet

  if (USERS.some(e => e === userId.toString()))
    return update.reply('😠 Этот пользователь заблокирован')

  // Balance
  res.push(
    '💵 Баланс: ' + new Intl.NumberFormat('en-IN').format(balance) + ' ₮'
  )

  // Reputation
  res.push(
    '💠 Репутация: ' + new Intl.NumberFormat('en-IN').format(rank) + ' R'
  )
  res.push('')

  shopData.groups.forEach(group => {
    const { icon, name, title } = group
    const groupItems = items[title]

    // If there is items
    if (groupItems.length !== 0) {
      const item = shopUtils.getItemById(groupItems[0])

      // Push group text
      res.push(`${icon} ${name}: ${item.name}`)
    }
  })

  // If there is pets
  if (pets.length !== 0) {
    // Push pets group text
    res.push('\n👣 Питомцы:')

    // Push pet's text
    pets.forEach((id, i) => {
      const pet = shopUtils.getPetById(id)
      res.push(`  [ ${i + 1} ] ${pet.icon} ${pet.name}`)
    })
  }

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

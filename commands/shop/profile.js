exports.run = async (api, update, args) => {
  const User = require('../../lib/User')
  const { handleError } = require('../../utils')

  const shopData = require('../../shopData')

  try {
    let { senderId } = update
    let userId = args[0] ? args[0].split('|')[0].slice(3) : senderId
    let name = await api.users.get({ user_ids: userId, name_case: 'nom' })
    let user = new User(userId)
    let res = [`${name[0].first_name}, твой профиль:\n`]
    let items = await user.fetchInventory()
    let balance = await user.getAmount()
    let rank = await user.getReputation()
    let pets = await user.fetchPets()

    // Balance
    res.push('💵 Баланс')
    res.push('  ' + balance + 'T')
    res.push('')

    // Reputation
    res.push('💠 Репутация')
    res.push('  ' + rank)
    res.push('')

    shopData.groups.forEach((group) => {
      const { icon, name, title } = group
      const groupItems = items[title]

      // If there is items
      if (groupItems.length !== 0) {
        // Push group text
        res.push(`${icon} ${name}:`)

        // Push item
        groupItems.forEach((id, i) => {
          const item = shopData.getItemById(id)
          res.push(`  [ ${i + 1} ] ${item.icon} ${item.name}`)
        })
      }

      // Ajacement space
      res.push('')
    })

    // If there is pets
    if (pets.length !== 0) {
      // Push pets group text
      res.push('👣 Питомцы:')

      // Push pet's text
      pets.forEach((id, i) => {
        const pet = shopData.getPetById(id)
        res.push(`  [ ${i + 1} ] ${pet.icon} ${pet.name}`)
      })
    }

    // Send result to the user
    update.send(res.join('\n'))
  } catch (e) {
    handleError(update, e)
  }
}

exports.command = {
  arguments: false,
  description: {
    en: 'Shows user\'s profile',
    ru: 'Показывает профиль пользователя'
  },
  alias: ['профиль']
}

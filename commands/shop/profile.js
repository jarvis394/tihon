exports.run = async (api, update) => {
  const User = require('../../lib/User')
  const { handleError } = require('../../utils')

  const shopData = require('../../shopData')

  try {
    let { senderId } = update
    let name = await api.users.get({ user_ids: senderId, name_case: 'nom' })
    let user = new User(senderId)
    let res = [`${name[0].first_name}, твой профиль:\n`]
    let items = await user.fetchInventory()
    let pets = await user.fetchPets()
    let length = 0

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
      
      // Add items length
      length += groupItems.length
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

    if (length === 0) res.push('  Пока ничего!  ')

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

exports.run = async (api, update) => {
  const User = require('../../lib/User')
  const { handleError } = require('../../utils')

  const shopData = require('../../shopData')

  try {
    let { senderId } = update
    let name = await api.users.get({
      user_ids: senderId,
      name_case: 'nom'
    })
    let user = new User(senderId)
    let res = [`${name[0].first_name}, твой профиль:\n`]
    let items = await user.fetchInventory()
    let pets = await user.fetchPets()
    
    if (items.length === 0) {
      res.push(' 📜 Пока ничего')
    } else {
      shopData.groups.forEach((group, gi) => {
        const { icon, name, groupId: id } = group
        const groupItems = items[group.title]
        
        res.push(`${icon} ${name}:`)
        if (groupItems.length !== 0) {
          groupItems.forEach((id, i) => {
            const item = shopData.getItemById(id)
            res.push(`  [ ${i + 1} ] ${item.icon} ${item.name}`)
          })
        } else {
          res.push('  📜 Пока ничего')
        }
        res.push('')
      })
      
      res.push('👣 Питомцы:')
      if (pets.length !== 0) {
        pets.forEach((id, i) => {
          const pet = shopData.getPetById(id)
          res.push(`  [ ${i + 1} ] ${pet.icon} ${pet.name}`)
        })
      } else {
        res.push('  📜 Пока ничего')
      }
    }

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

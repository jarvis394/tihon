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
    let len = 0
    
    items = items.map(id => shopData.items.find(e => e.id === id))
    
    if (items.length === 0) {
      res.push(' 📜 Пока ничего')
    } else {
      shopData.groups.forEach((group, gi) => {
        const { icon, name, groupId: id } = group
        const groupItems = items.filter(item => item.groupId === id)
        
        if (groupItems.length !== 0) {
          res.push(`${name}:`)
          groupItems.forEach((item, i) => res.push(`  [ ${len + i + 1} ] ${item.icon} ${item.name}`)) 
          res.push('')
          
          len += groupItems.length
        }
      })
      
      res.push('Питомцы:')
      if (pets.length !== 0) {
        pets.forEach((id, i) => {
          let pet = shopData.pets.find(i => i.id === parseInt(id))

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

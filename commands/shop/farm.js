exports.run = async (api, update) => {
  const User = require('../../lib/User')
  const shopData = require('../../data/shop')
  const handleError = require('../../utils/handleError')
  const HOUR = 3600000 * 6

  try {
    let firstTimeFlag = false
    let res = []
    let all = 0
    let user = new User(update.senderId)
    let items = await user.fetchInventory()
    let earnings = await user.getEarnings()

    // If no data found
    if (!earnings.farms) {
      earnings = user.setEarning('farms', Date.now() - HOUR)

      firstTimeFlag = true
    }

    // Last time command used
    let lastTime = earnings.farms
    let now = Date.now()

    if (now - lastTime >= HOUR || firstTimeFlag) {
      res.push('💸 Ты собрал урожай и продал его:\n')

      // For each item push if it has 'earning'
      items.farms.forEach(id => {
        let shopItem = shopData.getItemById(id)

        if (shopItem && shopItem.earning) {
          let earning = Math.floor(((now - lastTime) / HOUR) * shopItem.earning)

          user.add(earning)
          res.push(`‌‌ ‌‌ - ${shopItem.name} - ${earning}T`)
          all += earning
        }
      })

      // Return if nothing to add
      if (all === 0) return update.send('😯 Ты ничего не собрал')

      res.push('\nВсего: ' + all + 'T')

      user.setEarning('farms', now)
      user.addReputation(Math.floor(all / 1500))

      return update.send(res.join('\n'))
    } else {
      let left = new Date(HOUR - (now - lastTime))

      return update.send(
        `😕 Ты уже собирал урожай!\nОсталось ждать ${left.getHours()}:${left.getMinutes()}:${left.getSeconds()}`
      )
    }
  } catch (e) {
    handleError(update, e)
  }
}

exports.command = {
  arguments: false,
  description: {
    en: 'Manage and collect money from your farms!',
    ru: 'Управляй и собирай бабло со своего огорода!'
  },
  alias: ['ферма', 'огород']
}

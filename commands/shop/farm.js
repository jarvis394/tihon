exports.run = async (api, update) => {
  const User = require('../../lib/User')
  const shopData = require('../../shopData')
  const { handleError } = require('../../utils')
  const HOUR = 3600000

  try {
    let firstTimeFlag = false
    let res = []
    let all = 0
    let user = new User(update.senderId)

    if (!user.data.earnings.farms) {
      user.data.earnings.farms = Date.now() - HOUR
      firstTimeFlag = true
    }

    let lastTime = user.data.earnings.farms
    let now = Date.now()

    if (now - lastTime > HOUR || firstTimeFlag) {
      res.push('💸 Ты собрал урожай и продал его:\n')

      user.data.items.forEach(item => {
        let shopItem = shopData.items.find(i => i.id === item)

        if (shopItem && shopItem.earning) {
          let earning = Math.floor(((now - lastTime) / HOUR) * shopItem.earning)

          user.add(earning)
          res.push(`  ${shopItem.name} - ${earning}T`)
          all += earning
        }
      })

      if (all === 0) return update.send('😯 Ты ничего не собрал')

      res.push('\nВсего: ' + all + 'T')

      user.data.earnings.farms = now
      user.setData(user.data)

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

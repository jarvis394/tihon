exports.run = async ({ update, args }) => {
  const User = require('../../lib/models/User')
  const shopUtils = require('../../utils/shop')
  const format = require('../../utils/format')
  const { CURRENCY } = require('../../configs/constants')

  const HOUR = 3600000
  const WAITING_TIME = HOUR * 12
  const moment = require('moment')
  moment.locale('ru')

  let firstTimeFlag = false
  let res = []
  let all = 0
  const now = Date.now()
  const user = new User(update.senderId)
  const items = user.items
  let lastTime = user.earnings.farms
  const farm = items.farms

  if (!farm) {
    return update.reply(
      '😯 У тебя нет фермы! Купи её в магазине: \n\n@tihon_bot, магазин 4'
    )
  }

  // If no data found
  if (!lastTime) {
    lastTime = now - WAITING_TIME
    firstTimeFlag = true
  }

  if (now - lastTime >= WAITING_TIME || firstTimeFlag) {
    const item = shopUtils.getItemById(farm.id)
    const earning = Math.floor((now - lastTime) / WAITING_TIME) * item.earning

    // Return if nothing to add
    if (earning === 0) {
      return await update.reply('😯 Ты ничего не собрал')
    }

    if (Math.random() < 0.01) {
      return await update.reply(
        '🔥 Твои посевы сгорели! Ничего не поделаешь, придётся ждать следующего сезона!'
      )
    }

    res.push(
      `${item.icon} ${item.name} - ${format(item.earning)} ${CURRENCY}/12h\n`
    )
    res.push(
      '💸 Ты собрал урожай и продал его за ' + format(earning) + ' ' + CURRENCY
    )

    user.add(earning)
    user.setEarning('farms', now)
    user.addReputation(Math.floor(earning / 500))

    return update.reply(res.join('\n'))
  } else {
    const left = new Date(WAITING_TIME + lastTime)

    return update.reply(
      '😕 Ты уже собирал урожай!\n' +
        `Команда будет доступна ${moment(left).fromNow()}`
    )
  }
}

exports.command = {
  arguments: false,
  description: {
    en: 'Manage and collect money from your farms!',
    ru: 'Управляй и собирай бабло со своего огорода!',
  },
  alias: ['ферма', 'огород'],
}

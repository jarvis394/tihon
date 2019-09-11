exports.run = async ({ update, args }) => {
  const User = require('../../lib/User')

  const format = require('../../utils/format')
  const DAY = 86400000
  const { DAILY_BONUS, CURRENCY } = require('../../configs/constants')
  const moment = require('moment')
  moment.locale('ru')

  let firstTimeFlag = false
  let user = new User(update.senderId)
  let earnings = await user.getEarnings()

  // If no data found
  if (!earnings.daily) {
    earnings = user.setEarning('daily', Date.now() - DAY)

    firstTimeFlag = true
  }

  // Last time command used
  let lastTime = earnings.daily
  let now = Date.now()

  if (now - lastTime >= DAY || firstTimeFlag) {
    user.add(DAILY_BONUS)
    user.setEarning('daily', now)

    return update.send(
      `😝 Вы получили ежедневный бонус ${format(DAILY_BONUS)} ${CURRENCY}\n` +
        `💵 Твой баланс: ${format(await user.getAmount())} ${CURRENCY}`
    )
  } else {
    const left = new Date(lastTime + DAY)

    return update.send(
      '😕 Ты уже использовал бонус!\n' +
        `Команда будет доступна ${moment(left).fromNow()}`
    )
  }
}

exports.command = {
  arguments: false,
  description: {
    en: 'Get your daily bouns!',
    ru: 'Получи свой ежедневный бонус!',
  },
  alias: ['бонус', 'bonus'],
}

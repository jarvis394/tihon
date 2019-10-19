exports.run = async ({ update, args }) => {
  const moment = require('moment')
  const User = require('../../lib/models/User')
  const shopUtils = require('../../utils/shop')
  const format = require('../../utils/format')
  const { CURRENCY } = require('../../configs/constants')

  const HOUR = 3600000
  const WAITING_TIME = HOUR * 12
  const now = Date.now()
  const user = new User(update.senderId)
  const items = user.items
  const business = items.companies

  if (!business) {
    return update.reply(
      '😯 У тебя нет бизнеса! Приобрети его в магазине: \n\n@tihon_bot, магазин 5'
    )
  }

  const checkoutAliases = ['снять', 'вывод', 'вывести']
  const item = shopUtils.getItemById(business.id)
  let firstTimeFlag = false
  let res = []
  let all = 0
  let lastTime = user.earnings.business

  moment.locale('ru')

  if (!args[0]) {
    return await sendMainMenu()
  } else if (checkoutAliases.some(e => e === args[0])) {
    return await checkout()
  }

  async function sendMainMenu() {
    return await update.reply(
      `Статистика по бизнесу "${item.name}":\n` +
        `💸 Прибыль: ${item.earning} ${CURRENCY}\n` +
        `💰 На счету: ${Math.floor(
          (now - (lastTime ? lastTime : now - WAITING_TIME)) / WAITING_TIME
        ) * item.earning} ${CURRENCY}`
    )
  }

  async function checkout() {
    // If no data found
    if (!lastTime) {
      lastTime = now - WAITING_TIME
      firstTimeFlag = true
    }

    if (now - lastTime >= WAITING_TIME || firstTimeFlag) {
      const earning = Math.floor((now - lastTime) / WAITING_TIME) * item.earning

      // Return if nothing to add
      if (earning === 0) {
        return await update.reply('😯 У бизнеса нет средств на вывод!')
      }

      res.push(
        `${item.icon} ${item.name} - ${format(item.earning)} ${CURRENCY}/12h\n`
      )
      res.push('💸 С бизнеса снято ' + format(earning) + ' ' + CURRENCY)

      user.add(earning)
      user.setEarning('business', now)
      user.addReputation(Math.floor(earning / 500))

      return update.reply(res.join('\n'))
    } else {
      const left = new Date(WAITING_TIME + lastTime)

      return update.reply(
        '😕 Ты уже снимал деньги с бизнеса!\n' +
          `Команда будет доступна ${moment(left).fromNow()}`
      )
    }
  }
}

exports.command = {
  arguments: false,
  description: {
    en: 'Manage and collect money from your company!',
    ru: 'Управляй и собирай бабло со своей компании!',
  },
  alias: ['бизнес', 'companies', 'предприятие'],
}

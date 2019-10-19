exports.run = async ({ update, args }) => {
  const User = require('../../lib/models/User')

  const promoFunctions = require('../../data/promo')
  const { promoFunction, getPromo } = require('../../utils/promo')

  const code = args[0]
  const user = new User(update.senderId)
  const earnings = user.earnings
  const promo = getPromo()

  const promoCode = promo.code.toString()
  const earningsCode = earnings.promo ? earnings.promo.toString() : ''

  if (!promo.code) return update.reply('😔 Пока нет никаких промокодов')

  if (code === promo.code.toString() && earnings.promo !== promo.code) {
    user.setEarning('promo', promo.code)

    const func = promoFunctions[promo.n].function
    const state = await promoFunction(func, user)

    if (!state) return update.reply('🔻 Ты не успел! Промокод недействителен')

    return update.send('🎈 Промокод успешно применён')
  } else if (earnings.promo === promo.code) {
    return update.send('🔻 Ты уже вводил этот промокод. Жди следующий!')
  } else {
    return update.send('🔻 Введен неправильный или недействительный код')
  }
}

exports.command = {
  arguments: '(code)|(code)',
  description: {
    en: 'Gives promo money',
    ru: 'Даёт промо бабки',
  },
  alias: ['промобабки', 'промокод', 'промо'],
}

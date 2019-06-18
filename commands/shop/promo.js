exports.run = async (api, update, args) => {
  const User = require('../../lib/User')
  const shopData = require('../../shopData')
  const { handleError } = require('../../utils')
  const { getPromo, promoFunctions, promoFunction } = require('../../promo')
  
  try {
    let firstTimeFlag = false
    const code = args[0]
    const user = new User(update.senderId)
    const earnings = await user.getEarnings()
    const promo = require('../../.temp/promo.json')
    
    if (code === promo.code.toString() && earnings.promo !== promo.code) {
      user.setEarning('promo', promo.code)
      
      const func = promoFunctions[promo.n].function
      const state = await promoFunction(user, promo.timestamp + promo.timeout.time, func)
      
      if (!state) return update.reply('♦️ Ты не успел!')
      
      return update.send('🎈 Промокод успешно применён')
    } else {
      return update.send('♦️ Введен неправильный или недействительный код')
    }
  } catch (e) {
    handleError(update, e)
  }
}

exports.command = {
  arguments: '(code)|(code)',
  description: {
    en: 'Gives promo money',
    ru: 'Даёт промо бабки'
  },
  alias: ['промобабки', 'промокод', 'промо']
}

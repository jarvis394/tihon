exports.run = async (api, update, args) => {
  const User = require('../../lib/User')
  const shopData = require('../../shopData')
  const { handleError } = require('../../utils')
  const { promoFunction, CODE } = require('../../config')
  
  try {
    let firstTimeFlag = false
    let code = args[0]
    let user = new User(update.senderId)
    let earnings = await user.getEarnings()

    if (code === CODE && earnings.promo !== CODE) {
      earnings = user.setEarning('promo', code)
      await promoFunction(user)
      
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

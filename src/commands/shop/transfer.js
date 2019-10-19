exports.run = async ({ update, args }) => {
  const User = require('../../lib/models/User')
  const { USERS: BLACKLIST } = require('../../configs/blacklist')
  const { CURRENCY } = require('../../configs/constants')

  let receiverId, amount
  const { senderId } = update

  try {
    receiverId = parseInt(args[0].split('|')[0].slice(3))

    if (isNaN(receiverId)) throw new Error('argument \'receiverId\' is NaN')
  } catch (e) {
    return update.reply(
      '✖️ Не упомянут человек, кому нужно перевести тихоины\n\nПример: @tihon_bot передать *id 1000'
    )
  }

  if (receiverId === senderId) {
    return update.reply('🔻 Нельзя передавать деньги самому себе')
  }

  if (receiverId < 0) {
    return update.reply('🔻 Нельзя передавать деньги группе')
  }

  if (BLACKLIST.some(e => e === receiverId.toString()))
    return update.reply('😠 Этот пользователь заблокирован')

  try {
    amount = parseInt(args[1])

    if (isNaN(amount)) throw new Error('argument \'amount\' is NaN')
  } catch (e) {
    return update.reply('✖️ Нет суммы\n\nПример: @tihon_bot передать *id 1000')
  }

  if (amount <= 0) return update.reply('🤗 Так нельзя')
  const amt = Math.ceil(amount * 0.98)

  const user = new User(update.senderId)
  const receiver = new User(receiverId)
  const s = await user.isEnoughFor(amount)

  if (!s.state) {
    return update.reply(
      '✖️ У тебя нет такой суммы! Тебе осталось накопить всего ' +
        (amount - s.amount) +
        CURRENCY
    )
  }

  receiver.add(amt)
  user.subtract(amount)

  return update.reply(
    '🎉 Передано ' +
      amt +
      ' ' +
      CURRENCY +
      ' (2% комиссии) пользователю ' +
      receiverId
  )
}

exports.command = {
  arguments: '(id) (amt)|(id) (amt)',
  description: {
    en: 'Transfer money to a user',
    ru: 'Передать деньги пользователю',
  },
  alias: ['перевод', 'передать'],
}

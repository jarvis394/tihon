exports.run = async ({ update, args }) => {
  const User = require('../../lib/models/User')
  let user = new User(
    args[0] && args[1] ? args[1].split('|')[0].slice(3) : update.senderId
  )

  if (!args[0] || (args[0] && isNaN(args[0]))) {
    return update.send(
      '❌ Введи число\n\nПример: /?dev-addMoney 1000 *tihon_bot'
    )
  }

  user.add(parseInt(args[0]))

  return update.send('✨ Добавлено ' + args[0] + 'T к ' + user.id)
}

exports.command = {
  hidden: true,
}

exports.run = async ({ update, args }) => {
  const { timeouts } = require('../../variables')

  timeouts.set('test', {
    timeout: 10000,
    timestamp: Date.now(),
  })

  return update.reply('😄 Таймаут установлен')
}

exports.command = {
  hidden: true,
}

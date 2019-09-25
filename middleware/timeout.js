const { updates, timeouts } = require('../variables')
const moment = require('moment')

moment.locale('ru')

updates.on('message', async (update, next) => {
  if (!update.state.isCommand) return await next()

  const { command } = update.state
  const foundCommand = timeouts.get(command.name)
  const now = Date.now()

  if (foundCommand) {
    const { timestamp, timeout } = foundCommand

    if (now < timestamp + timeout) {
      const left = new Date(timestamp + timeout)
      return update.reply(
        `😑 Эту команду можно использовать ${moment(left).fromNow()}`
      )
    } else {
      timeouts.delete(command.name)
    }
  }

  await next()
})

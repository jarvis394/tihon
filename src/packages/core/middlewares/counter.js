const handleError = require('../../../utils/handleError')
const { updates } = require('../../../globals')

updates.on('message', async (update, next) => {
  let { count } = update.state

  if (!count) count = 0
  count += 1

  if (count % 25 === 0) {
    try {
      const cmd = require('../../../commands/random/random')
      cmd.run({ update })
    } catch (e) {
      handleError(e)
    }

    count = 0
  }

  await next()
})

const handleError = require('../utils/handleError')
const { randomStorage, api } = require('../variables')

module.exports = async (update) => {
  let { count } = update.state

  if (!count) count = 0
  count += 1

  if (count % 50 === 0) {
    try {
      const cmd = require('../commands/random/random.js')
      cmd.run(api, update, [], randomStorage)
    } catch (e) {
      handleError(e)
    }

    count = 0
  }
}

const { random } = require('./random')

module.exports = async payload => {
  const { requestsQueue } = require('../globals')

  setTimeout(
    () => requestsQueue.add(payload.request),
    random(1, 10) * 60 * 1000
  )
}

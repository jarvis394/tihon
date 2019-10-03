const { AUTO_INTERVAL } = require('../configs/constants')
const { api, log } = require('../globals')

setInterval(async () => {
  let list = await api.friends.getRequests({
    count: 1000,
  })
  list.items.forEach(friend => {
    api.friends
      .add({
        user_id: friend,
      })
      .catch(e => log.error(e))

    log.info('Added ' + friend + ' as friend', { private: true })
  })
}, AUTO_INTERVAL)

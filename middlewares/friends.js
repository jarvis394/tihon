const {
  interval
} = require('../config')
const log = require('loglevel')
const {
  api
} = require('../variables')

setInterval(async () => {
  let list = await api.friends.getRequests({
    count: 1000
  })
  list.items.forEach(friend => {
    api.friends.add({
      user_id: friend
    }).catch(e => log.error(e))

    log.info('Added ' + friend + ' as friend')
  })
}, interval)
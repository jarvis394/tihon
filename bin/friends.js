const { interval } = require('../config')
const { log, error } = require('../utils')

module.exports = (api) => {
  
  setInterval(async () => {
    
    let list = await api.friends.getRequests({ count: 1000 })
    list.items.forEach(friend => {
      api.friends.add({
        user_id: friend
      }).catch(e => error(e))
      
      log('Added ' + friend + ' as friend')
    })
    
  }, interval)
  
}
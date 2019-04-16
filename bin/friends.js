const { interval } = require("../config")

module.exports = (api) => {
  
  setInterval(async () => {
    
    let list = api.friends.getRequests({ count: 1000 })
    list.then(items => {
      items.items.forEach(friend => {
        api.friends.add({
          user_id: friend
        })
      })
    })
    
  }, interval)
  
}
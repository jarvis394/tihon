const { interval } = require("../config")

module.exports = (api) => {
  
  setInterval(async () => {
    
    let list = await api.friends.getRequests({ count: 1000 })
    list.items.forEach(friend => {
      api.friends.add({
        user_id: friend.id
      })
    })
    
  }, interval)
  
}
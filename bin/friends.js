const { interval } = require("../config")

module.exports = (api) => {
  
  setInterval(async () => {
    
    let list = api.friends.getRequests({ count: 1000 })
    list.then(items => {
      items.items.forEach(friend => {
        console.log
        api.friends.add({
          user_id: friend.id
        })
      })
    })
    
  }, 100000)
  
}
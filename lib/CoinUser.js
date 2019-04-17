const firebase = require("firebase")
const db = firebase.firestore()

const store = require("store")

/**
 * Class for handling user's coins
 * @param {String|Number} id User id
 */
class CoinUser {
  constructor(id) {
    this.id = id.toString()
    
    db.collection("coins").doc(this.id).get(d => {
      
    })
  }
  
  async getAmount() {
     store.get(this.id)
  }
  
  add(n) {
  }
  
  substract(n) {
  }
}
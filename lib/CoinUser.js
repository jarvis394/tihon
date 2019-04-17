const firebase = require("firebase")
const db = firebase.firestore()

const store = require("store")

/**
 * 1. User sends message
 * 2. New CoinUser is being created if not
 * 3. Data fetches and goes to the store
 * 4. Any changes goes to the store
 * 5. On reload and on interval data from stre goes to db
 */

/**
 * Class for handling user's coins
 * @param {String|Number} id User id
 */
class CoinUser {
  constructor(id) {
    this.id = id.toString()
    this.data = null
    db.collection("coins").doc(this.id).get(d => {
      this.data = d.doc()
    })
    
    store.set(this.id, this.data)
  }
  
  async getAmount() {
     return await store.get(this.id)
  }
  
  async add(n) {
    this.data.amount += n
    await store.set(this.id, this.data)
  }
  
  async substract(n) {
    this.data.amount -= n
    await store.set(this.id, this.data)
  }
  
  async forceUpdate() {
    await db.collection("coins").doc(this.id).set(this.data)
  }
}

module.exports = CoinUser
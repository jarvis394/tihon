const firebase = require("firebase")
const db = firebase.firestore()

const store = require("store")

const defaultData = {
  amount: 0
}

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
    this.data = defaultData
    db.collection("coins").doc(this.id).get().then(d => {
      // d = d.data()
      this.data = d.data()
    })
    
    this.getAmount = this.getAmount.bind(this)
    this.add = this.add.bind(this)
    this.substract = this.substract.bind(this)
    this.forceUpdate = this.forceUpdate.bind(this)
  }
  
  getAmount() {
     return this.data.amount
  }
  
  add(n) {
    this.data.amount += n
    store.set(this.id, this.data)
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
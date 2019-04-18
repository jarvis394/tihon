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
    
    this.getAmount = this.getAmount.bind(this)
    this.add = this.add.bind(this)
    this.substract = this.substract.bind(this)
    this.forceUpdate = this.forceUpdate.bind(this)
  }
  
  init() {
    db.collection("coins").doc(this.id).get().then(d => {
      if (d.data()) this.data = d.data()
    })
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

module.exports.data = async (id) => {
  id = id.toString()
  
  let data
  await db.collection("coins")
    .doc(id)
    .get()
    .then(d => data = d.data())
  
  if (!data) data = defaultData
  
  return data
}

module.exports.flush = async (id, data) => {
  console.log(id)
  await db.collection("coins")
    .doc(id)
    .set(data.data)
}
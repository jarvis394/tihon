/* eslint-disable no-unused-vars */

const firebase = require('firebase')
const db = firebase.firestore()
const { error } = require('../utils')

const store = require('store')

const defaultData = {
  amount: 0,
  items: []
}

/**
 * 1. User sends message
 * 2. New CoinUser is being created if not
 * 3. Data fetches and goes to the store
 * 4. Any changes goes to the store
 * 5. On reload and on interval data from stre goes to db
 */

// TODO: Use classes
// Not working because 'store' can't handle classes
/**
 * Class for handling user's coins
 * @param {String|Number} id User id
 */
/*class CoinUser {
  constructor(id) {
    this.id = id.toString()
    this.data = defaultData
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
}*/

module.exports.data = async (id) => {
  id = id.toString()
  
  let data
  await db.collection('coins')
    .doc(id)
    .get()
    .then(d => data = d.data())
  
  if (!data) {
    data = defaultData
    
    await db.collection('coins')
      .doc(id)
      .set(data)
  }
  
  if (store.get(id)) data.amount = store.get(id).amount
  
  return data
}

module.exports.setData = async (id, data) => {
  id = id.toString()
  const ref = db.collection('coins').doc(id)

  store.set(id, data)
  
  return db.runTransaction((transaction) => {
    return transaction.get(ref).then((d) => {
      transaction.update(ref, data)
    })
  }).catch(e => error(e))
}
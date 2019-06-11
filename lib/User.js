const firebase = require('firebase')
const db = firebase.firestore()
const {
  error
} = require('loglevel')

const { users: store } = require('../variables')

const defaultData = {
  amount: 0,
  items: [],
  earnings: {}
}

class User {

  /**
   * User class
   * @param {number|string} id User's ID
   * @class
   */
  constructor(id) {
    this.id = id.toString()
    this.data = defaultData

    const storeData = store.get(this.id)

    if (storeData) this.data = storeData
    else store.set(this.id, this.data)
  }

  /**
   * Sets data to DB
   * @param {object} data Data to set
   */
  async setData(data) {
    const ref = db.collection('coins').doc(this.id)

    store.set(this.id, data)

    return db.runTransaction((transaction) => {
      return transaction.get(ref).then(() => {
        transaction.update(ref, data)
      })
    }).catch(e => error(e))
  }

  /**
   * Fetches user's balance from DB
   */
  async fetchBalance() {
    let data = {}

    await db.collection('coins')
      .doc(this.id)
      .get()
      .then(d => data = d.data())

    return data.balance
  }

  /**
   * Fetches user's inventory from DB
   */
  async fetchInventory() {
    let data = {}

    await db.collection('coins')
      .doc(this.id)
      .get()
      .then(d => data = d.data())
    
    this.data.items = data.items
    this.data.earnings = data.earnings

    return this.data
  }

  async getAmount() {
    return await this.fetchBalance() + this.data.amount
  }

  async notEnoughFor(price) {
    return await this.getAmount() - price < 0
  }

  /**
   * Adds amount to the user's balance
   * @param {number} n Amount to add
   */
  add(n) {
    this.data.amount += n
    store.set(this.id, this.data)
  }

  /**
   * Subtracts amount from the user's balance
   * @param {numebr} n Amount to subtract
   */
  subtract(n) {
    this.data.amount -= n
    store.set(this.id, this.data)
  }

  /**
   * Adds item to the user
   * @param {number} id Item's ID
   */
  addItem(id) {
    this.data.items.push(id)
    store.set(this.id, this.data)
  }

  removeItem(id) {
    this.data.items.splice(id, 1)
    store.set(this.id, this.data)
  }
  
  addPet(pet) {
    this.data.pets.push(pet)
    store.set(this.id, this.data)
  }
  
  removePet(petIndex) {
    this.data.pets.splice(petIndex, 1)
    store.set(this.id, this.data)
  }
}

module.exports = User

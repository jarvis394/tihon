const { firebase, users: store } = require('../variables')
const db = firebase.firestore()
const { error } = require('loglevel')

class User {
  /**
   * User class
   * @param {number|string} id User's ID
   * @class
   */
  constructor(id) {
    const defaultData = {
      amount: 0,
      items: [],
      earnings: {}
    }

    this.id = id.toString()
    this.data = defaultData

    const hasStoreData = store.has(this.id)

    if (hasStoreData) this.data = store.get(this.id)
    else store.set(this.id, this.data)
  }

  /**
   * Sets data to local storage
   * @param {object} data Data to set
   */
  async setData(data) {
    return store.set(this.id, data)
  }

  /**
   * Push data to DB
   * @param {object} data Data to set
   */
  async pushData(data) {
    const ref = db.collection('coins').doc(this.id)

    store.set(this.id, data)

    return db
      .runTransaction(transaction => {
        return transaction.get(ref).then(() => {
          transaction.update(ref, data)
        })
      })
      .catch(e => error(e))
  }

  /**
   * Fetches user's data from DB
   */
  async fetchData() {
    let data = {}

    await db
      .collection('coins')
      .doc(this.id)
      .get()
      .then(d => (data = d.data()))

    return data
  }

  /**
   * Fetches user's balance from DB
   */
  async fetchBalance() {
    const data = await this.fetchData()
    return data.amount
  }

  /**
   * Fetches user's earnings from DB
   */
  async fetchEarnings() {
    const data = await this.fetchData()
    return data.earnings
  }

  /**
   * Fetches user's items from DB
   */
  async fetchInventory() {
    const data = await this.fetchData()
    return data.items.concat(this.data.items)
  }

  async getAmount() {
    return (await this.fetchBalance()) + this.data.amount
  }

  async isEnoughFor(price) {
    const amount = await this.getAmount()
    const state = amount - price > 0

    return {
      amount,
      state
    }
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

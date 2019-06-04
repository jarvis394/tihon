const firebase = require('firebase')
const db = firebase.firestore()
const {
  error
} = require('../utils')

const store = require('store')

const defaultData = {
  amount: 0,
  items: [],
  earnings: {}
}

class User {

  constructor(id) {
    this.id = id.toString()
  }

  async init() {
    await db.collection('coins')
      .doc(this.id)
      .get()
      .then(d => this.data = d.data())

    if (!this.data) {
      this.data = defaultData

      db.collection('coins')
        .doc(this.id)
        .set(this.data)

      store.set(this.id, this.data)
    }

    if (store.get(this.id)) {
      this.data.amount = store.get(this.id).amount
    }

    return this.data
  }

  async setData(data) {
    const ref = db.collection('coins').doc(this.id)

    store.set(this.id, data)

    return db.runTransaction((transaction) => {
      return transaction.get(ref).then(() => {
        transaction.update(ref, data)
      })
    }).catch(e => error(e))
  }

  getBalance() {
    return this.data.amount + 'T'
  }

  getAmount() {
    return this.data.amount
  }

  notEnoughFor(price) {
    return this.getAmount() - price < 0
  }

  add(n) {
    this.data.amount += n
    store.set(this.id, this.data)
  }

  subtract(n) {
    this.data.amount -= n
    store.set(this.id, this.data)
  }

  addItem(item) {
    this.data.items.push(item)
    return this.setData(this.data)
  }

  removeItem(item) {
    this.data.items.splice(item, 1)
    return this.setData(this.data)
  }
  
  addPet(pet) {
    this.data.pets.push(pet)
    return this.setData(this.data)
  }
  
  removePet(petIndex) {
    this.data.pets.splice(petIndex, 1)
    return this.setData(this.data)
  }
}

module.exports = User
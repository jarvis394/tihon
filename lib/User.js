const { firebase, users: store } = require('../variables')
const db = firebase.firestore()
const { error } = require('loglevel')
const shopData = require('../shopData')

class User {
  /**
   * User class
   * @param {number|string} id User's ID
   * @class
   */
  constructor(id) {
    let defaultData = {
      amount: 0,
      items: {},
      pets: [],
      rank: 0,
      earnings: {}
    }
    
    shopData.groups.forEach(g => defaultData.items[g.title] = [])

    this.id = id.toString()
    this.data = defaultData

    const hasStoreData = store.has(this.id)

    if (hasStoreData) this.data = store.get(this.id)
    else store.set(this.id, this.data)
    
    for (let key in defaultData) {
      if (!this.data[key]) this.data[key] = defaultData[key]
    }
  }

  /**
   * Sets data to local storage
   * @param {object} data Data to set
   */
  setData(data) {
    this.data = data
    return store.set(this.id, data)
  }
  
  setEarning(field, data) {
    this.data.earnings[field] = data
    return store.set(this.id, this.data)
  }

  /**
   * Push data to DB
   * @param {object} data Data to set
   */
  pushData(data) {
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
    let defaultData = {
      amount: 0,
      items: {},
      pets: [],
      rank: 0,
      earnings: {}
    }
    
    shopData.groups.forEach(g => defaultData.items[g.title] = [])

    await db
      .collection('coins')
      .doc(this.id)
      .get()
      .then(d => (data = d.data()))
    
    if (data) {
      for (let key in defaultData) {
        if (!data[key]) data[key] = defaultData[key]
      }
    } else {
      data = defaultData
    }

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
    for (let key in data.items) {
      data.items[key] = this.data.items[key].concat(data.items[key] ? data.items[key] : [])
    }
    
    return data.items
  }
  
  /**
   * Fetches user's pets from DB
   */
  async fetchPets() {
    const data = await this.fetchData()
    return data.pets.concat(this.data.pets)
  }
  
  async getEarnings() {
    if (Object.keys(this.data.earnings).length === 0) {
      return await this.fetchEarnings()
    } else {
      return this.data.earnings
    }
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
  async addItem(group, id) {
    const items = await this.fetchInventory()
    
    if (group.maxItems <= items[group.title].length) {
      return false
    }
    
    this.data.items[group.title].push(id)
    store.set(this.id, this.data)
    
    return true
  }

  removeItem(group, i) {
    const ref = db.collection('coins').doc(this.id)

    this.data.items[group].splice(i, 1)
    
    db
      .runTransaction(async transaction => {
        return await transaction.get(ref).then((d) => {
          let data = d.data()
          /console.log(d, data)
          
          data.items[group] = this.data.items[group]
          
          transaction.update(ref, data)
        })
      })
      .catch(e => error(e))
    
    this.data.items[group] = []
    
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

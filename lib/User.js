const { firebase, users: store, log } = require('../variables')
const getUsersHash = require('../utils/getUsersHash')
const shopData = require('../data/shop')
const db = firebase.firestore()

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
      earnings: {
        promo: null,
        farms: null,
        daily: null
      },
      guild: null,
      hidden: false
    }

    // Add groups to user's items
    shopData.groups.forEach(g => (defaultData.items[g.title] = []))

    this.id = id.toString()
    this.numberId = this.id * 1
    this.data = defaultData

    const hasStoreData = store.has(this.id)

    if (hasStoreData) this.data = store.get(this.id)
    else store.set(this.id, this.data)

    // Set to default all missing fields
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

  /**
   * Sets earning by field
   * @param {string} field Field to set
   * @param {any} data Data to set
   */
  setEarning(field, data) {
    this.data.earnings[field] = data
    store.set(this.id, this.data)

    return this.data.earnings
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
      .catch(e => log.error(e))
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
      earnings: {
        promo: null,
        farms: null,
        daily: null
      },
      guild: null,
      hidden: false
    }

    // Add groups to user's items
    shopData.groups.forEach(g => (defaultData.items[g.title] = []))

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
   * Fetches user's reputation from DB
   */
  async fetchReputation() {
    const data = await this.fetchData()
    return data.rank
  }

  /**
   * Fetches user's earnings from DB
   */
  async fetchEarnings() {
    const data = await this.fetchData()
    return data.earnings
  }
  
  /**
   * Fetches user's guild from DB
   */
  async fetchGuild() {
    const data = await this.fetchData()
    return data.guild
  }

  /**
   * Fetches user's items from DB
   */
  async fetchInventory() {
    const data = await this.fetchData()
    for (let key in data.items) {
      data.items[key] = this.data.items[key].concat(
        data.items[key] ? data.items[key] : []
      )
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

  /**
   * Gets user's earnings
   */
  async getEarnings() {
    const data = await this.fetchEarnings()

    if (!this.data.earnings) this.data.earnings = data

    for (let key in data) {
      if (!this.data.earnings[key]) this.data.earnings[key] = data[key]
    }

    return this.data.earnings
  }

  /**
   * Gets user's amount
   */
  async getAmount() {
    return (await this.fetchBalance()) + this.data.amount
  }

  /**
   * Gets user's reputation
   */
  async getReputation() {
    return (await this.fetchReputation()) + this.data.rank
  }

  /**
   * Checks whether user can buy an item
   * @param {number} price Item's proce
   */
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
   * Adds amount to the user's rank
   * @param {number} n Amount to add
   */
  addReputation(n) {
    this.data.rank += n
    store.set(this.id, this.data)
  }

  /**
   * Removes amount from the user's rank
   * @param {number} n Amount to add
   */
  subtractReputation(n) {
    if (this.data.rank - n < 0) return false

    this.data.rank -= n
    store.set(this.id, this.data)
  }

  /**
   * Adds item to the user
   * @param {number} id Item's ID
   */
  async addItem(group, id) {
    const items = await this.fetchInventory()

    // Check maximum in group
    if (1 <= items[group.title].length) {
      return false
    }

    // Push to the group in user's items
    this.data.items[group.title].push(id)
    store.set(this.id, this.data)

    return true
  }

  /**
   * Removes item from user's inventory
   * @param {string} group Group
   * @param {number} i Index
   */
  async removeItem(group, i) {
    const ref = db.collection('coins').doc(this.id)

    // Fetch items
    const userItems = await this.fetchInventory()
    this.data.items[group] = userItems[group]

    // Remove item
    this.data.items[group].splice(i, 1)

    db.runTransaction(async transaction => {
      return await transaction.get(ref).then(d => {
        let data = d.data()

        // Data is being to be equal with user's items group
        data.items[group] = this.data.items[group]

        // Update DB data
        transaction.update(ref, data)

        // Set user's items in group to the empty array
        this.data.items[group] = []

        // Set data to the local store
        store.set(this.id, this.data)
      })
    }).catch(e => log.error(e))
  }

  /**
   * Add pet to the user
   * @param {number} id Pet's ID
   */
  addPet(id) {
    this.data.pets.push(id)
    store.set(this.id, this.data)
  }

  /**
   * Removes pet from the user
   * @param {number} i Index
   */
  removePet(i) {
    this.data.pets.splice(i, 1)
    store.set(this.id, this.data)
  }
  
  /**
   * Gets user's amount
   *
   * @param {string} id Guild's ID
   */
  setGuild(id) {
    const ref = db.collection('coins').doc(this.id)

    this.data.guild = id
    
    store.set(this.id, this.data)

    return db
      .runTransaction(transaction => {
        return transaction.get(ref).then(() => {
          transaction.update(ref, this.data)
        })
      })
      .catch(e => log.error(e))
  }
  
  /**
   * Marries to users
   */
  marryWith(user) {
    const usersHash = getUsersHash(this.numberId, user.numberId)
    const ref = db.collection('marries').doc(usersHash)

    return db
      .runTransaction(async transaction => {
        return await transaction.get(ref).then(doc => {
          if (doc.data()) return {
            data: doc.data(),
            exists: true
          }

          const data = {
            personA: this.id,
            personB: user.id,
            date: Date.now()
          }

          transaction.set(ref, data)

          return true
        })
      })
      .catch(e => log.error(e))
  }
}

module.exports = User

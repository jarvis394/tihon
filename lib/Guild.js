const { firebase, guildsStore: store, log } = require('../variables')
const db = firebase.firestore()
const _ = require('lodash')
const thinid = require('thinid')

const defaultData = {
  id: '',
  name: '',
  members: [],
  _actions: [],
  reputation: 0,
  stats: {
    win: 0,
    lose: 0
  },
  money: 0,
  shield: 0,
  timeout: 0,
  population: {
    farmers: 0,
    peasants: 0,
    workers: 0
  }
}

class Guild {
  constructor(id) {
    this.id = id
    this.data = _.cloneDeep(defaultData)
    
    const hasStoreData = store.has(this.id)

    if (hasStoreData) this.data = store.get(this.id)
    else store.set(this.id, this.data)

    // Set to default all missing fields
    for (let key in _.cloneDeep(defaultData)) {
      if (!this.data[key]) this.data[key] = defaultData[key]
    }
  }

  async fetchData() {
    let data = {}
    await db
      .collection('guilds')
      .doc(this.id)
      .get()
      .then(d => (data = d.data()))
    
    if (data) {
      for (let key in _.cloneDeep(defaultData)) {
        if (!data[key]) data[key] = _.cloneDeep(defaultData)[key]
      }
    } else {
      data = _.cloneDeep(defaultData)
    }

    return data
  }
  
  /**
   * Push data to DB
   * @param {object} data Data to set
   */
  pushData(data) {
    const ref = db.collection('guilds').doc(this.id)

    store.set(this.id, data)

    return ref.update(data).catch(e => log.error(e))
  }
  
  getLocalData() {
    return store.get(this.id)
  }
  
  /**
   * Sets data to local storage
   * @param {object} data Data to set
   */
  setLocalData(data) {
    this.data = data
    return store.set(this.id, data)
  }
  
  /**
   * Fetches guild's balance from DB
   */
  async fetchMoney() {
    const data = await this.fetchData()
    return data.money
  }

  /**
   * Fetches guild's reputation from DB
   */
  async fetchReputation() {
    const data = await this.fetchData()
    return data.reputation
  }
  
  /**
   * Fetches guild's members from DB
   */
  async fetchMembers() {
    const data = await this.fetchData()
    return data.members
  }
  
  /**
   * Gets guild's money amount
   */
  async getMoney() {
    const a = (await this.fetchMoney()) + this.data.money
    return a < 0 ? 0 : a
  }

  /**
   * Gets guild's reputation
   */
  async getReputation() {
    const a = (await this.fetchReputation()) + this.data.reputation
    return a < 0 ? 0 : a
  }
  
  async getName() {
    return (await this.fetchData()).name
  }
  
  async getStats() {
    const data = await this.fetchData()
    return {
      win: data.stats.win + this.data.stats.win,
      lose: data.stats.lose + this.data.stats.lose
    }
  }
  
  /**
   * Gets guild's current members
   */
  async getMembers() {
    let data = (await this.fetchMembers()).concat(this.data.members)
    
    this.data._actions.forEach((action) => {
      switch (action.type) {
        case 'remove': {
          data = data.filter(e => e.id !== action.memberId)
          break
        }
        case 'roleChange': {
          data[data.findIndex(e => e.id === action.memberId)].role = action.to
          break
        }
      }
    })
    
    return data
  }
  
  async getFilteredMembers() {
    return (await this.getMembers()).filter(e => e.role > 0)
  }
  
  /**
   * Adds money to the guild
   * @param {number} amount Amount to add
   */
  addMoney(amount) {
    this.data.money += amount
    return store.set(this.id, this.data)
  }
  
  /**
   * Subtracts money from the guild
   * @param {number} amount Amount to subtract
   */
  subtractMoney(amount) {
    this.data.money -= amount
    return store.set(this.id, this.data)
  }
  
  /**
   * Adds amount to the guilds's rank
   * @param {number} amount Amount to add
   */
  addReputation(amount) {
    this.data.rank += amount
    return store.set(this.id, this.data)
  }

  /**
   * Removes amount from the user's rank
   * @param {number} amount Amount to subtract
   */
  subtractReputation(amount) {
    this.data.rank -= amount
    return store.set(this.id, this.data)
  }
  
  async changeRole(id, role) {
    this.data._actions.push({ memberId: id, type: 'roleChange', to: role })
    return store.set(this.id, this.data)
  }

  async addMember(id, role) {
    this.data.members.push({ id, role })
    return store.set(this.id, this.data)
  }
  
  async removeMember(id) {
    this.data._actions.push({ memberId: id, type: 'remove' })
    return store.set(this.id, this.data)
  }
}

module.exports = Guild

const { api, db } = require('../globals')
const getUsersHash = require('../utils/getUsersHash')
const getUsersTop = require('../utils/getUsersTop')
const { getGroupByItemId } = require('../utils/shop')
const { USER: defaultData } = require('../configs/defaultData')
const _ = require('lodash')

class User {
  /**
   * User class
   * @param {number|string} id User's ID
   * @class
   */
  constructor(id) {
    this.id = id * 1
    this.stringId = id.toString()

    const data = db
      .prepare(`SELECT * FROM main.users WHERE id = ${this.id}`)
      .get()
    if (!data) {
      this.setData(defaultData)
    }
  }

  _deepParse(obj) {
    const isObject = value =>
      value && typeof value === 'object' && value.constructor === Object
    const parse = obj => JSON.parse(obj)

    for (const key in obj) {
      try {
        obj[key] = parse(obj[key])
        if (isObject(obj[key])) obj[key] = this._deepParse(obj[key])
      } catch (e) {
        // Ignore exception
      }
    }

    return obj
  }

  _deepFormat(obj) {
    const stringify = obj => JSON.stringify(obj)

    for (const key in obj) {
      // Stringify arrays, objects and booleans
      if (typeof obj[key] === 'object' || typeof obj[key] === 'boolean') {
        obj[key] = stringify(obj[key])
      }
    }

    return obj
  }

  getData(field = '*') {
    const st = db.prepare(
      `SELECT ${field} FROM main.users WHERE id = ${this.id}`
    )
    let data = st.get()

    if (field === '*' && !data) {
      this.setData(defaultData)
    }

    if (data) {
      data = this._deepParse(data)
    } else {
      data = field !== '*' ? defaultData[field] : defaultData
    }

    if (field !== '*') {
      this.data[field] = data
    } else {
      this.data = data
    }

    return data
  }

  /**
   * Sets data to db
   * @param {object} data Data to set
   */
  setData(data) {
    data.id = this.id

    const st = db.prepare(
      'INSERT OR REPLACE INTO main.users (id, money, reputation, guild, hidden) VALUES (@id, @money, @reputation, @guild, @hidden);'
    )
    return st.run(data)
  }

  /**
   * Gets user's hidden status
   */
  get hidden() {
    return db
      .prepare(`SELECT hidden FROM main.users WHERE id = ${this.id};`)
      .get().hidden
  }

  /**
   * Gets user's items
   */
  get items() {
    const data = db
      .prepare(`SELECT * from main.items WHERE userId = ${this.id};`)
      .all()

    let res = {}

    data.forEach(item => {
      res[item.groupName] = item
    })

    return res
  }

  /**
   * Gets user's pet
   */
  get pet() {
    const data = db
      .prepare(`SELECT * from main.pets WHERE userId = ${this.id};`)
      .get()

    return data
  }

  /**
   * Gets user's earnings
   */
  get earnings() {
    const data = db
      .prepare(`SELECT * from main.earnings WHERE userId = ${this.id};`)
      .all()

    let res = {}

    data.forEach(e => (res[e.field] = e.time))

    return res
  }

  /**
   * Gets user's amount
   */
  get money() {
    const data = db
      .prepare(`SELECT money FROM main.users WHERE id = ${this.id};`)
      .get().money
    return data
  }

  /**
   * Gets user's reputation
   */
  get reputation() {
    const data = db
      .prepare(`SELECT reputation FROM main.users WHERE id = ${this.id};`)
      .get().reputation
    return data
  }

  /**
   * Gets user's amount
   */
  get guild() {
    const data = db
      .prepare(`SELECT guild FROM main.users WHERE id = ${this.id};`)
      .get().guild
    return data
  }

  /**
   * Checks whether user can buy an item
   * @param {number} price Item's proce
   */
  isEnoughFor(price) {
    const amount = this.money
    const state = amount - price > 0

    return {
      amount,
      state,
    }
  }

  /**
   * Adds amount to the user's balance
   * @param {number} n Amount to add
   */
  add(n) {
    return db
      .prepare(
        `UPDATE main.users SET money = ${this.money + n} WHERE id = ${this.id};`
      )
      .run()
  }

  /**
   * Subtracts amount from the user's balance
   * @param {numebr} n Amount to subtract
   */
  subtract(n) {
    const m = this.money

    if (m - n < 0) return false

    return db
      .prepare(`UPDATE main.users SET money = ${m - n} WHERE id = ${this.id};`)
      .run()
  }

  /**
   * Adds amount to the user's rank
   * @param {number} n Amount to add
   */
  addReputation(n) {
    return db
      .prepare(
        `UPDATE main.users SET reputation = ${this.reputation + n} WHERE id = ${
          this.id
        };`
      )
      .run()
  }

  /**
   * Removes amount from the user's rank
   * @param {number} n Amount to subtract
   */
  subtractReputation(n) {
    const r = this.reputation

    if (r - n < 0) return false

    return db
      .prepare(
        `UPDATE main.users SET reputation = ${r - n} WHERE id = ${this.id};`
      )
      .run()
  }

  /**
   * Sets earning by field
   * @param {string} field Field to set
   * @param {number} time Time to set
   */
  setEarning(field, time) {
    return db
      .prepare(
        `
      INSERT OR REPLACE INTO main.earnings (userId, field, time) VALUES (@userId, @field, @time);
    `
      )
      .run({
        userId: this.id,
        field,
        time,
      })
  }

  /**
   * Sets item in the user's inventory
   * @param {number} id Item's ID
   */
  setItem(id) {
    const items = this.items
    const { title: group } = getGroupByItemId(id)
    const dbGroup = items[group]

    // Check maximum in group
    if (dbGroup && 1 <= dbGroup.quantity) {
      return false
    }

    // Set data
    db.prepare(
      'INSERT OR REPLACE INTO items (userId, groupName, id, quantity) VALUES (@userId, @groupName, @id, @quantity);'
    ).run({
      userId: this.id,
      groupName: group,
      id,
      quantity: 1,
    })

    return this.items[group]
  }

  /**
   * Removes item from user's inventory
   * @param {string} group Group
   */
  removeItem(group) {
    const item = this.items[group]

    // Check item
    if (!item) return false

    console.log(group, item)

    if (item.quantity - 1 <= 0) {
      db.prepare(
        `DELETE FROM main.items WHERE userId = ${this.id} AND groupName = '${group}';`
      ).run()
    } else {
      db.prepare(
        `
        UPDATE main.items 
        SET quantity = ${item.quantity - 1}
        WHERE userId = ${this.id} AND groupName = '${group}';
      `
      ).run()
    }

    return this.items[group] || null
  }

  /**
   * Set user's pet
   * @param {number} id Pet's ID
   */
  setPet(id) {
    const pet = this.pet
    const timestamp = Date.now()

    // Check pet existence in user's data
    if (pet) {
      return false
    }

    // Set data
    db.prepare(
      'INSERT OR REPLACE INTO main.pets (userId, id, timestamp) VALUES (@userId, @id, @timestamp);'
    ).run({
      userId: this.id,
      id,
      timestamp,
    })

    return timestamp
  }

  /**
   * Removes pet from the user
   */
  removePet() {
    if (!this.pet) return false

    db.prepare(`DELETE FROM main.pets WHERE userId = ${this.id};`).run()

    return true
  }

  /**
   * Sets user's guild
   * @param {string} id Guild's ID
   */
  setGuild(id) {
    return db
      .prepare(`UPDATE main.users SET guild = ${id} WHERE id = ${this.id};`)
      .run()
  }

  /**
   * Marries to users
   */
  marryWith(user) {
    const usersHash = getUsersHash(this.numberId, user.numberId)
    // const ref = db.collection('marries').doc(usersHash)

    // return db
    //   .runTransaction(async transaction => {
    //     return await transaction.get(ref).then(doc => {
    //       if (doc.data())
    //         return {
    //           data: doc.data(),
    //           exists: true
    //         }

    //       const data = {
    //         personA: this.id,
    //         personB: user.id,
    //         date: Date.now()
    //       }

    //       transaction.set(ref, data)

    //       return true
    //     })
    //   })
    //   .catch(e => log.error(e))
  }

  async getName(nameCase = 'nom') {
    const response = await api.users.get({
      user_ids: this.id,
      name_case: nameCase,
    })

    return response[0]
  }

  async getFullName(nameCase = 'nom') {
    const response = await api.users.get({
      user_ids: this.id,
      name_case: nameCase,
    })

    return response[0].first_name + ' ' + response[0].last_name
  }

  getTopPlace() {
    const place = getUsersTop().findIndex(e => e.id === this.id)

    if (place >= 0) return place + 1
    else return null
  }
}

module.exports = User

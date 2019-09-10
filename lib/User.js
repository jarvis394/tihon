const { log, api, db } = require('../variables')
const getUsersHash = require('../utils/getUsersHash')
const { USER: defaultData } = require('../configs/defaultData')
const _ = require('lodash')

class User {
  /**
   * User class
   * @param {number|string} id User's ID
   * @class
   */
  constructor(id) {
    this.id = id.toString()
    this.numberId = this.id * 1

    const data = db
      .prepare(`SELECT * FROM main.users WHERE id = ${this.id}`)
      .get()
    if (!data) {
      this.setData({
        money: 0,
        reputation: 0,
        guild: null,
        hidden: 'false'
      })
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
    // data = this._deepFormat(data)

    const st = db.prepare(
      'INSERT INTO main.users (id, money, reputation, guild, hidden) VALUES (@id, @money, @reputation, @guild, @hidden);'
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
      .prepare(`SELECT * from main.items WHERE ownerId = ${this.id};`)
      .all()

    return data
  }

  /**
   * Gets user's pet
   */
  get pet() {
    const data = db
      .prepare(`SELECT * from main.pets WHERE ownerId = ${this.id};`)
      .run()

    return data
  }

  /**
   * Gets user's earnings
   */
  get earnings() {
    const data = db
      .prepare(`SELECT * from main.earnings WHERE userId = ${this.id};`)
      .all()

    return data
  }

  /**
   * Gets user's amount
   */
  get money() {
    const data = db
      .prepare(`SELECT money FROM main.users WHERE id = ${this.id};`)
      .get().money
    return data < 0 ? 0 : data
  }

  /**
   * Gets user's reputation
   */
  get reputation() {
    const data = db
      .prepare(`SELECT reputation FROM main.users WHERE id = ${this.id};`)
      .get().reputation
    return data < 0 ? 0 : data
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
      state
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
        time
      })
  }

  /**
   * Adds item to the user
   * @param {Group} group Item's group
   * @param {number} id Item's ID
   * @param {number} quantity Quantity
   */
  async setItem(group, id, quantity = 1) {
    const items = this.items

    // Check maximum in group
    if (1 <= items[group.title].quantity) {
      return false
    }

    // Set data
    db.prepare(
      `
      INSERT OR REPLACE INTO main.items (ownerId, group, itemId, quantity) VALUES (@ownerId, @group, @itemId, @quantity);
    `
    ).run({
      ownerId: this.id,
      group: group.title,
      itemId: id,
      quantity
    })

    return this.items[group.title]
  }

  /**
   * Removes item from user's inventory
   * @param {string} group Group
   */
  async removeItem(group) {
    const items = this.items

    // Check item
    if (!items[group.title]) return false

    if (items[group.title].quantity - 1 <= 0) {
      db.prepare(
        `DELETE FROM main.items WHERE ownerId = ${this.id} AND group = ${group.title};`
      ).run()
    } else {
      db.prepare(
        `
        UPDATE main.items 
        SET quantity = ${items[group.title].quantity - 1}
        WHERE ownerId = ${this.id} AND group = ${group.title};
      `
      ).run()
    }

    return this.data.items[group.title] || null
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
      'INSERT OR REPLACE INTO main.pets (ownerId, petId, timestamp) VALUES (@ownerId, @petId, @timestamp);'
    ).run({
      ownerId: this.id,
      petId: id,
      timestamp
    })

    return timestamp
  }

  /**
   * Removes pet from the user
   */
  removePet() {
    if (!this.pet) return false

    db.prepare(`DELETE FROM main.pets WHERE ownerId = ${this.id};`).run()

    return true
  }

  /**
   * Sets user's guild
   * @param {string} id Guild's ID
   */
  setGuild(id) {
    db.prepare(
      `UPDATE main.users SET guild = ${id} WHERE id = ${this.id};`
    ).run()

    return true
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
      name_case: nameCase
    })

    return response[0]
  }

  async getFullName(nameCase = 'nom') {
    const response = await api.users.get({
      user_ids: this.id,
      name_case: nameCase
    })

    return response[0].first_name + ' ' + response[0].last_name
  }
}

module.exports = User

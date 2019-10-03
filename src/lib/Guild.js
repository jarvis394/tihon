const { db } = require('../globals')

class Guild {
  constructor(id) {
    this.id = id * 1
  }

  exists() {
    const d = db
      .prepare(`SELECT COUNT(id) FROM main.guilds WHERE id = ${this.id}`)
      .get()

    return d['COUNT(id)'] == 1
  }

  delete() {
    return db.prepare(`DELETE FROM main.guilds WHERE id = ${this.id}`).run()
  }

  /**
   * Sets data to db
   * @param {object} data Data to set
   */
  setData(data) {
    data.id = this.id

    const st = db.prepare(
      'INSERT INTO main.guilds (id, name, money, reputation, wins, loses, shield, timeout) VALUES (@id, @name, @money, @reputation, @wins, @loses, @shield, @timeout);'
    )
    return st.run(data)
  }

  get name() {
    return db
      .prepare(`SELECT name FROM main.guilds WHERE id = ${this.id}`)
      .get().name
  }

  /**
   * Fetches guild's balance from DB
   */
  get money() {
    return db
      .prepare(`SELECT money FROM main.guilds WHERE id = ${this.id}`)
      .get().money
  }

  /**
   * Fetches guild's reputation from DB
   */
  get reputation() {
    return db
      .prepare(`SELECT reputation FROM main.guilds WHERE id = ${this.id}`)
      .get().reputation
  }

  /**
   * Fetches guild's members from DB
   */
  get members() {
    return db
      .prepare(`SELECT * FROM main.guildMembers WHERE guildId = ${this.id}`)
      .all()
  }

  get stats() {
    return db
      .prepare(`SELECT wins, loses FROM main.guilds WHERE id = ${this.id}`)
      .get()
  }

  get shield() {
    let shield = db
      .prepare(`SELECT shield FROM main.guilds WHERE id = ${this.id}`)
      .get().shield

    if (shield < Date.now()) {
      this.setShield(null)
      return null
    } else {
      return shield
    }
  }

  get timeout() {
    return db
      .prepare(`SELECT timeout FROM main.guilds WHERE id = ${this.id}`)
      .get().timeout
  }

  get population() {
    let res = db
      .prepare(`SELECT * FROM main.guildPopulations WHERE id = ${this.id}`)
      .get()
    delete res.id

    return res
  }

  addPopulation(group, quantity) {
    let population = this.population

    if (!population) {
      db.prepare(
        `INSERT INTO main.guildPopulations (id, peasants, farmers, warriors) VALUES (${this.id}, 0, 0, 0)`
      ).run()
      population = this.population
    }

    return db
      .prepare(
        `UPDATE main.guildPopulations SET ${group} = ${population[group] +
          quantity}`
      )
      .run()
  }

  getFilteredMembers() {
    return this.members.filter(e => e.role > 0)
  }

  /**
   * Adds money to the guild
   * @param {number} amount Amount to add
   */
  addMoney(amount) {
    if (!amount || isNaN(amount)) throw new Error('Укажи число')

    return db
      .prepare(
        `UPDATE main.guilds SET money = ${this.money + amount} WHERE id = ${
          this.id
        };`
      )
      .run()
  }

  /**
   * Subtracts money from the guild
   * @param {number} amount Amount to subtract
   */
  subtractMoney(amount) {
    const m = this.money

    if (m - amount < 0) throw new Error('У колхоза нет денег')

    return db
      .prepare(
        `UPDATE main.guilds SET money = ${m - amount} WHERE id = ${this.id};`
      )
      .run()
  }

  /**
   * Adds amount to the guilds's rank
   * @param {number} amount Amount to add
   */
  addReputation(amount) {
    return db
      .prepare(
        `UPDATE main.guilds SET reputation = ${this.reputation +
          amount} WHERE id = ${this.id};`
      )
      .run()
  }

  /**
   * Removes amount from the user's rank
   * @param {number} amount Amount to subtract
   */
  subtractReputation(amount) {
    const r = this.reputation

    if (r - amount < 0) return false

    return db
      .prepare(
        `UPDATE main.guilds SET reputation = ${r - amount} WHERE id = ${
          this.id
        };`
      )
      .run()
  }

  getMember(id) {
    return db
      .prepare(`SELECT * FROM main.guildMembers WHERE id = ${id} AND role > 0`)
      .get()
  }

  changeRole(id, role) {
    return db
      .prepare(`UPDATE main.guildMembers SET role = ${role} WHERE id = ${id}`)
      .run()
  }

  addMember(id, role) {
    return db
      .prepare(
        'INSERT INTO main.guildMembers (id, guildId, role) VALUES (@id, @guildId, @role);'
      )
      .run({
        id,
        guildId: this.id,
        role,
      })
  }

  removeMember(id) {
    return db.prepare(`DELETE FROM main.guildMembers WHERE id = ${id}`).run()
  }

  setShield(date) {
    return db.prepare(`UPDATE main.guilds SET shield = ${date}`).run()
  }

  setTimeout(date) {
    return db.prepare(`UPDATE main.guilds SET timeout = ${date}`).run()
  }
}

module.exports = Guild

module.exports = class Dialog {
  constructor(peer, f) {
    this.peer = peer.toString()
    this.defaultSettings = {
      interval: 3600 * 1000,
      preset: 0,
      auto: true,
      no: false
    }

    const { firebase } = require('../variables')
    this.db = f ? f.firestore() : firebase.firestore()
  }

  /**
   * Sets data to user in dialog to db
   * @param {number} id userId
   * @param {any} data Data to set
   */
  async setUser(id, data) {
    await this.db
      .collection('dialogs')
      .doc(this.peer)
      .collection('users')
      .doc(id.toString())
      .set(data)
  }

  /**
   * Get user from db
   * @param {number} id userId
   */
  async getUser(id) {
    let data
    await this.db
      .collection('dialogs')
      .doc(this.peer)
      .collection('users')
      .doc(id.toString())
      .get()
      .then(doc => (data = doc.data()))

    return data
  }

  /**
   * Update user's roles
   * @param {number} id userId
   * @param {array} roles Roles array
   */
  async updateRoles(id, roles) {
    await this.db
      .collection('dialogs')
      .doc(this.peer)
      .collection('users')
      .doc(id.toString())
      .update({
        roles: roles
      })
      .catch(() => {
        this.db
          .collection('dialogs')
          .doc(this.peer)
          .collection('users')
          .doc(id.toString())
          .set({
            roles: roles
          })
      })
  }

  /**
   * Get dialog
   */
  async get() {
    let data
    await this.db
      .collection('dialogs')
      .doc(this.peer)
      .get()
      .then(doc => (data = doc.data()))

    return data
  }

  /**
   * Set data to dialog
   * @param {any} data Data to set
   */
  async set(data) {
    await this.db
      .collection('dialogs')
      .doc(this.peer)
      .set(data)
  }

  /**
   * Update dialog
   * @param {any} data Data to update
   */
  async update(data) {
    await this.db
      .collection('dialogs')
      .doc(this.peer)
      .update(data)
      .catch(() => {
        this.setSettings(this.defaultSettings)
      })
  }

  /**
   * Check dialog's data
   */
  async checkData() {
    let data = await this.get()
    if (
      !data ||
      (data && !data.auto && !data.interval && !data.preset && !data.no)
    ) {
      await this.set(this.defaultSettings)

      return this.defaultSettings
    } else {
      return data
    }
  }
}

const firebase = require("firebase");
const db = firebase.firestore();

module.exports = class DBDialog {

  constructor(peer) {
    this.peer = peer.toString()
  }

  /**
   * Sets data to user in dialog to db
   * @param {number} id userId
   * @param {any} data Data to set
   */
  async set(id, data) {
    await db.collection("dialog")
      .doc(this.peer)
      .collection("users")
      .doc(id.toString())
      .set(data)
  }

  /**
   * Get user from db
   * @param {number} id userId
   */
  async get(id) {
    let data
    await db.collection("dialog")
      .doc(this.peer)
      .collection("users")
      .doc(id.toString())
      .get().then(doc => data = doc.data())

    return data
  }

  /**
   * Update user's roles
   * @param {number} id userId
   * @param {array} roles Roles array
   */
  async updateRoles(id, roles) {
    await db.collection("dialog")
      .doc(this.peer)
      .collection("users")
      .doc(id.toString())
      .update({
        "roles": roles
      })
  }

}
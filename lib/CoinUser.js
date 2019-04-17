const firebase = require("firebase")
const db = firebase.firestore()

/**
 * Class for handling user's coins
 * @param {String|Number} id User id
 */
class CoinUser {
  constructor(id) {
    this.id = id.toString()
  }
  
  async getAmount() {
    let data
    await db.collection("coins")
      .doc(this.id)
      .get().then(doc => data = doc.data())

    return data
  }
  
  add(n) {
  }
  
  substract(n) {
  }
}
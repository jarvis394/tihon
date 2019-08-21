const { firebase } = require('../variables')
const db = firebase.firestore()

class Guild {
  constructor(id) {
    this.id = id
    this.data = {}
  }

  create(name, id) {}

  async fetchData() {
    let data = {}
    await db
      .collection('guilds')
      .doc(this.id)
      .get()
      .then(d => (data = d.data()))

    this.data = data

    return data
  }

  async changeRole(id, role) {
    return db.runTransaction(async t => {
      const guildRef = db.collection('guilds').doc(id)

      return await t.get(guildRef).then(async doc => {
        const data = doc.data()

        data.members[data.members.findIndex(e => e.id === id)].role = role

        return await db
          .collection('guilds')
          .doc(this.id)
          .set(data)
      })
    })
  }

  async addMember(id, role) {
    return await db.runTransaction(async t => {
      const guildRef = db.collection('guilds').doc(id)

      return await t.get(guildRef).then(async doc => {
        const data = doc.data()

        if (data.members.length >= 50) return false

        data.members.push({ id, role })

        return await db
          .collection('guilds')
          .doc(this.id)
          .set(data)
      })
    })
  }
}

module.exports = Guild

const firebase = require('firebase-admin')
const log = require('../startup/log')

const flush = (data) => {
  const db = firebase.firestore()
  data = data.length > 0 ? JSON.parse(data) : {}

  for (let id in data) {
    db.runTransaction(async t => {
      const userRef = db.collection('coins').doc(id)

      return await t.get(userRef).then(async doc => {
        if (doc.exists) {
          const d = doc.data()
          const user = data[id]

          user.amount += d.amount
          user.rank += d.rank

          // Items
          for (let key in user.items) {
            user.items[key] = user.items[key].concat(
              d.items[key] ? d.items[key] : []
            )
          }

          // Earnings
          for (let key in d.earnings) {
            let e = user.earnings[key]
            let dataEarning = d.earnings[key]

            if (key !== 'promo' && (dataEarning > e || !e)) {
              user.earnings[key] = dataEarning
            }
          }

          user.pets = data[id].pets.concat(d.pets)

          return await t.update(userRef, user)
        } else {
          return await t.set(userRef, data[id])
        }
      })
    }).catch(e => log.error(e))
  }
}

class Container {
  constructor(capacity) {
    this.capacity = capacity
    this.data = {}
  }
  
  get(field) {
    return this.data[field]
  }
  
  has(field) {
    return !!this.data[field]
  }
  
  set(field, value) {
    if (Object.keys(this.data).length > this.capacity) {
      flush(this.data)
      log.success('Flushed users data to Firestore')
      
      this.data = {}
    }
    
    return this.data[field] = value
  }
  
  delete(field) {
    return delete this.data[field]
  }

  forEach(func) {
    for (let key in this.data) {
      func(this.data[key], key)
    }
  }
}

module.exports = Container

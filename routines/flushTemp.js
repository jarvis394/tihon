const fs = require('fs')
const { firebase } = require('./init')
const chalk = require('chalk')
const log = require('loglevel')

// Flush temp data from last reload
fs.readFile('.temp/coinsData.json', (err, data) => {
  if (err) return log.error(err)

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
          user.items = data[id].items.concat(d.items)
          user.pets = data[id].pets.concat(d.pets)
          
          return await t.update(userRef, data[id])
        } else {
          return await t.set(userRef, data[id])
        }
      })
    }).catch(e => log.error(e))
  }
  
  log.info(chalk.gray('Pushed temp data'))
})

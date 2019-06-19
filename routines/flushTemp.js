const fs = require('fs')
const { firebase } = require('./init')
const chalk = require('chalk')
const log = require('loglevel')

// Flush temp data from last reload
fs.readFile('.temp/coinsData.json', (err, data) => {
  if (err && err.code === 'ENOENT') return log.error('No file found on path \'.temp/coinsData.json\'')
  else if (err) return log.error(err)

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
            user.items[key] = user.items[key].concat(d.items[key] ? d.items[key] : [])
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
  
  log.info(chalk.gray('Pushed temp data'))
})

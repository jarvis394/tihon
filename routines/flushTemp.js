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
        data[id].amount += doc.data().amount

        return await t.update(userRef, data[id])
      })
    }).catch(e => log.error(e))
  }
  
  log.info(chalk.gray('Pushed temp data'))
})

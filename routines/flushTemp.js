console.log('- ft')

const fs = require('fs')
const {
  firebase
} = require('./init')
const log = require('loglevel')

// Flush temp data from last reload
fs.readFile('.temp/coinsData.json', (err, data) => {
  if (err) return log.error(err)

  const db = firebase.firestore()
  data = data.length > 0 ? JSON.parse(data) : {}
  
  db.runTransaction(async t => {
    for (let id in data) {
      const userRef = db.collection('coins').doc(id)

      return await t.get(userRef).then(async doc => {
        data[id].amount += doc.data().amount
        
        await t.update(userRef, data[id])
      })
    }
  }).catch(e => log.error(e))
})

log.info('Pushed temp data')

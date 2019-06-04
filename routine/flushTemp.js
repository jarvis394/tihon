const fs = require('fs')
const { firebase } = require('./init')
const log = require('loglevel')

// Flush temp data from last reload
fs.readFile('.temp/coinsData.json', (err, data) => {
  if (err) return log.error(err)
  
  const db = firebase.firestore()
  data = data.length ? JSON.parse(data) : {}

  for (let id in data) {
    db.collection('coins').doc(id).update(data[id])
  }
})

const FIREBASE_KEYS = require('./firebaseKeys.json')
const FIREBASE_DB_URL = process.env.FIREBASE_DB_URL
const firebase = require('firebase-admin')
const User = require('../lib/User')
const fs = require('fs')
const oldShop = require('./data')
const shopData = require('../data/shop')

let us = {},
  ds = {}

// Initialize Firebase app
firebase.initializeApp({
  credential: firebase.credential.cert(FIREBASE_KEYS),
  databaseURL: FIREBASE_DB_URL,
})

const sqlDb = require('../startup/init/database')

;(async () => {
  const db = firebase.firestore()
  let coinsData, dialogsData

  await db
    .collection('coins')
    .get()
    .then(d => (coinsData = d))
  await db
    .collection('dialogs')
    .get()
    .then(d => (dialogsData = d))

  coinsData.forEach(user => {
    try {
      const data = user.data()
      const u = new User(user.id)

      if (user.id <= 100) return

      console.log(user.id, data.amount, data.rank, data.hidden)

      // u.setData({
      //   id: user.id * 1,
      //   money: data.amount,
      //   reputation: data.rank,
      //   guild: null,
      //   hidden: data.hidden
      // })

      const st = db
        .prepare(
          'INSERT OR REPLACE INTO main.users (id, money, reputation, guild, hidden) VALUES (@id, @money, @reputation, @guild, @hidden);'
        )
        .run({
          id: user.id * 1,
          money: data.amount,
          reputation: data.rank,
          guild: null,
          hidden: data.hidden,
        })

      for (let item in data.items) {
        if (data.items[item].length !== 0) {
          const i = data.items[item][0]
          const itemOld = oldShop.items.find(e => e.id == i)
          const item = shopData.items.find(e => e.name === itemOld.name)

          if (!item) return

          u.setItem(item.id)
        }
      }

      if (data.pets.length !== 0) {
        u.setPet(data.pets[0])
      }

      console.log('> Processed', user.id)

      us[user.id] = data
    } catch (e) {
      console.error('> On', user.id + ':', e)
    }
  })

  dialogsData.forEach(dialog => {
    try {
      const data = dialog.data()

      sqlDb
        .prepare(
          'INSERT INTO main.dialogs (id, autoMailing, canReadMessages) VALUES (@id, @autoMailing, @canReadMessages);'
        )
        .run({
          id: dialog.id,
          autoMailing: data.auto,
          canReadMessages: !data.no,
        })

      console.log('> Processed', dialog.id)

      ds[dialog.id] = data
    } catch (e) {
      console.error('> On', dialog.id + ':', e)
    }
  })

  fs.writeFile('tools/users.json', JSON.stringify(us), err =>
    console.error(err)
  )
  fs.writeFile('tools/dialogs.json', JSON.stringify(ds), err =>
    console.error(err)
  )
})()

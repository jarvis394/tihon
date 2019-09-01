const fs = require('fs')
const log = require('./log')
const { firebase } = require('./init/firebase')
const db = firebase.firestore()
const chalk = require('chalk')

// Flush temp data from last reload for users
fs.readFile('temp/coinsData.json', (err, data) => {
  if (err && err.code === 'ENOENT') {
    log.warn('No file found on path \'temp/coinsData.json\'', {
      private: true
    })
  } else if (err) {
    return log.error(err)
  }
  
  data = data ? JSON.parse(data) : {}

  for (let id in data) {
    db.runTransaction(async t => {
      const userRef = db.collection('coins').doc(id)

      return await t.get(userRef).then(async doc => {
        if (doc.exists) {
          const d = doc.data()
          const user = data[id]

          user.amount += d.amount
          user.rank += d.rank
          
          if (user.amount < 0) user.amount = 0
          if (user.rank < 0) user.rank = 0
          
          // Guild
          if (!user.guild) user.guild = d.guild ? d.guild : null

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

            if (!dataEarning || (e && dataEarning && e > dataEarning)) {
              user.earnings[key] = e
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

  log.info('Pushed temp data for users', { private: true })

  fs.writeFile('temp/coinsData.json', JSON.stringify({}), () => {})
})

// Flush temp data from last reload for guilds
fs.readFile('temp/guildsData.json', (err, data) => {
  if (err && err.code === 'ENOENT') {
    log.warn('No file found on path \'temp/guildsData.json\'', {
      private: true
    })
  } else if (err) {
    return log.error(err)
  }

  data = data ? JSON.parse(data) : {}

  for (let id in data) {
    db.runTransaction(async t => {
      const guildRef = db.collection('guilds').doc(id)

      return await t.get(guildRef).then(async doc => {
        if (doc.exists) {
          const d = doc.data()
          const guild = data[id]
          
          guild.id = d.id
          guild.name = d.name

          guild.money += d.money
          guild.reputation += d.reputation
          
          if (guild.money < 0) guild.money = 0
          if (guild.reputation < 0) guild.reputation = 0
          
          // Stats
          guild.stats.win += d.stats.win
          guild.stats.lose += d.stats.lose
          
          /*
          // Items
          for (let key in user.items) {
            user.items[key] = user.items[key].concat(
              d.items[key] ? d.items[key] : []
            )
          }*/
          
          // Members
          guild.members = guild.members.concat(d.members)
          guild._actions.forEach((action) => {
            switch (action.type) {
              case 'remove': {
                guild.members = guild.members.filter(e => e.id !== action.memberId)
                break
              }
              case 'roleChange': {
                guild.members[guild.members.findIndex(e => e.id === action.memberId)].role = action.to
                break
              }
            }
          })
          
          return await t.update(guildRef, guild)
        } else {
          return await t.set(guildRef, data[id])
        }
      })
    }).catch(e => log.error(e))
  }

  log.info('Pushed temp data for guilds', { private: true })

  fs.writeFile('temp/guildsData.json', JSON.stringify({}), () => {})
})

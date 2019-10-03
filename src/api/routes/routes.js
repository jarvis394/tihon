const User = require('../lib/User')
const shopData = require('../data/shop')
const cmd = require('node-cmd')
const crypto = require('crypto')
const readline = require('reverse-line-reader')

const { app, commands, db, log } = require('../globals')
const { SECRET } = require('../configs/secrets')
const promo = require('../utils/promo')
const getUsersTop = require('../utils/getUsersTop')

// Home
app.get('/', (req, res) => {
  res.redirect('https://dedtihon.cf/')
})

app.get('/db/:table', async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')

  try {
    const data = db
      .prepare(`SELECT * FROM main.${req.params ? req.params.table : 'users'}`)
      .all()
      .map(e => JSON.stringify(e))
      .join('<br />')
    return await res.send(data)
  } catch (e) {
    return await res.send(e.message)
  }
})

app.get('/api/commands', async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')

  return await res.json({
    commands,
  })
})

app.get('/api/data/shop', async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')

  return await res.json(shopData)
})

app.get('/api/logs/main', async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  const count = req.query.count || 200
  const offset = req.query.offset || 0

  let logs = []
  let c = 0

  readline.eachLine('logs/main.log', line => {
    if (c >= offset && line) logs.push(line)
    if (logs.length >= count) {
      res.json({
        data: logs,
      })

      // Stop reading
      return false
    }

    c++
  })
})

app.get('/api/profile/:id', async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  let { id } = req.params
  if (isNaN(id)) {
    res.status(402)
    return res.json({
      code: 402,
      error: '\'id\' field should be a Number',
    })
  }

  const user = new User(id)

  return res.json({
    money: user.money,
    reputation: user.reputation,
    items: user.items,
    earnings: user.earnings,
    guild: user.guild,
    hidden: user.hidden,
    id: id,
  })
})

app.get('/api/statistics', async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')

  const result = getUsersTop()

  return res.json(result)
})

app.get('/api/generatePromo', async (req, res) => {
  if (req.query.secret !== SECRET) return res.sendStatus(403)

  const data = promo.generate()

  return res.send(data)
})

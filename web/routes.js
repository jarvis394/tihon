const User = require('../lib/User')
const shopData = require('../data/shop')
const cmd = require('node-cmd')
const crypto = require('crypto')
const readline = require('reverse-line-reader')

const { app, commands, db, log } = require('../variables')
const { SECRET } = require('../configs/secrets')
const promo = require('../utils/promo')

// Home
app.get('/', (req, res) => {
  res.redirect('https://tihon-web.glitch.me')
})

app.get('/api/cmdList', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  
  return res.json({
    commands: commands
  })
})

app.get('/api/data/shop', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  
  return res.json(shopData)
})

app.get('/api/logs/main', async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  const count = req.query.count || 200
  const offset = req.query.offset || 0
  
  let logs = []
  let c = 0
  
  readline.eachLine('logs/main.log', (line) => {
    if (c >= offset && line) logs.push(line)
    if (logs.length >= count) {
      res.json({
        data: logs
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
      error: '\'id\' field should be a Number'
    })
  }
  
  let user = new User(id)
  
  const amount = await user.getAmount()
  const items = await user.fetchInventory()
  const rank = await user.getReputation()
  const earnings = await user.getEarnings()
  
  return res.json({
    amount,
    items,
    rank,
    earnings
  })
})

app.get('/api/statistics', async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  
  let result = []
  let s
  let docs = []
  
  await db
    .collection('coins')
    .orderBy('rank', 'desc')
    .limit(10)
    .get()
    .then(snapshot => (s = snapshot))
  
  s.forEach(doc => docs.push(doc))
  
  for (let doc of docs) {
    const user = new User(doc.id)
    const data = {
      rank: await user.getReputation(),
      balance: await user.getAmount()
    }
    
    result.push({ id: doc.id, data: data })
  }
  
  return res.json(result)
})

app.get('/api/generatePromo', async (req, res) => {
  if (req.query.secret !== SECRET) return res.sendStatus(403)
  
  const data = promo.generate()
  
  return res.send(data)
})

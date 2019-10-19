const express = require('express')
const { commands } = require('../../../globals')
const { SECRET } = require('../../../configs/secrets')
const promo = require('../../../utils/promo')
const randomMessage = require('../../../utils/randomMessage')
const router = express.Router()

router.get('/', async (_, res) => await res.send('woop woop woop'))

router.get('/commands', async (_, res) => await res.json({ commands }))

router.get('/generate', async (_, res) => await res.json(await randomMessage()))

router.post('/generatePromo', async (req, res) => {
  if (req.body.secret !== SECRET) return res.sendStatus(403)

  const data = promo.generate()

  return res.json(data)
})

module.exports = router

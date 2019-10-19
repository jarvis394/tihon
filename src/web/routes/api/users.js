const express = require('express')
const getUsersTop = require('../../../utils/getUsersTop')
const User = require('../../../lib/models/User')
const router = express.Router()

router.get('/:id', async (req, res) => {
  const { id } = req.params

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
    id: user.id,
  })
})

router.get('/statistics', async (_, res) => res.json(getUsersTop()))

module.exports = router

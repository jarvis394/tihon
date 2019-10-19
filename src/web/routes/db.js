const { db } = require('../../globals')
const express = require('express')
const router = express.Router()

router.get('/:table', async (req, res) => {
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

module.exports = router

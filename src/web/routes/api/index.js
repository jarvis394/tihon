const express = require('express')
const router = express.Router()

const users = require('./users')
const logs = require('./logs')
const data = require('./data')
const root = require('./root')

router.use('/users', users)
router.use('/logs', logs)
router.use('/data', data)
router.use('/', root)

module.exports = router

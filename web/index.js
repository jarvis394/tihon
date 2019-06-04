const express = require('express')
const bodyParser = require('body-parser').json()
const log = require('loglevel')

const {
  app
} = require('../variables')

// Middlewares
app.use(express.static('web/public'))
app.use(bodyParser)

// Routes
require('./routes')

const listener = app.listen(4000, () => {
  log.info('Started on port ' + listener.address().port)
})
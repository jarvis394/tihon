const express = require('express')
const bodyParser = require('body-parser').json()

const { app, log } = require('../variables')

// Middlewares
app.use(express.static('web/public'))
app.use(express.static('logs'))
app.use(bodyParser)

// Routes
require('./routes')

const listener = app.listen(4000, () => {
  log.info('Started on port ' + listener.address().port, { private: true })
})

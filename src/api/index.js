const express = require('express')
const bodyParser = require('body-parser').json()

const { app, log } = require('../globals')

// Middlewares
app.use(express.static('logs'))
app.use(bodyParser)

// Routes
require('./routes')

const listener = app.listen(443, () => {
  log.info('Started on port ' + listener.address().port, { private: true })
})

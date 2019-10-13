const { app } = require('../../globals')

module.exports = app.get('/', (req, res) => {
  res.redirect('https://dedtihon.cf/')
})

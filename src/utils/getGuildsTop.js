const { db } = require('../globals')

module.exports = () =>
  db
    .prepare('SELECT * FROM main.guilds ORDER BY reputation DESC LIMIT 100;')
    .all()

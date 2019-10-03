const { db } = require('../globals')

module.exports = () =>
  db
    .prepare(
      'SELECT * FROM main.users WHERE id > 0 AND hidden IS NOT \'true\' ORDER BY reputation DESC LIMIT 100;'
    )
    .all()

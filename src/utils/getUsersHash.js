const Hashids = require('hashids')
const { SECRET } = require('../configs/secrets')
const hash = new Hashids(SECRET, 10)

module.exports = (a, b) => {
  const sortedIds = a < b ? [a, b] : [b, a]
  const res = hash.encode(sortedIds)

  return res
}

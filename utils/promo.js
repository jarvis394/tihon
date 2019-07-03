const { random } = require('../utils/random')
const fs = require('fs')
const { log } = require('../variables')
const promos = require('../data/promo')

const promoFunction = async (f, u) => {
  return await f(u)
}

/**
 * Generates promo
 */
const generate = () => {
  const key = random(10000000, 99999999)
  const n = random(0, promos.length - 1)
  const promo = promos[n]
  const timestamp = Date.now()

  fs.writeFile(
    '.temp/promo.json',
    JSON.stringify({ code: key, timestamp, n, promo }),
    err => {
      if (err) {
        log.error(err)
      } else {
        log.info(
          'Generated new key: ' + key + '\n          Timestamp: ' + timestamp
        )
      }
    }
  )

  return {
    code: key,
    n,
    promo,
    timestamp
  }
}

/**
 * Gets current promo
 */
const getPromo = () => {
  return require('../.temp/promo.json')
}

module.exports = {
  promoFunction,
  generate,
  getPromo
}

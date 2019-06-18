const { random, randomArray } = require('./utils')
const fs = require('fs')
const log = require('loglevel')

const timeouts = [
  {
    text: '12 часов',
    time: 12 * 3600 * 1000
  },
  {
    text: '12 часов',
    time: 12 * 3600 * 1000
  },
  {
    text: '12 часов',
    time: 12 * 3600 * 1000
  },
  {
    text: '12 часов',
    time: 12 * 3600 * 1000
  },
  
  {
    text: '24 часа',
    time: 24 * 3600 * 1000
  },
  {
    text: '24 часа',
    time: 24 * 3600 * 1000
  },
  {
    text: '24 часа',
    time: 24 * 3600 * 1000
  },
  {
    text: '24 часа',
    time: 24 * 3600 * 1000
  },
  
  {
    text: '3 часа',
    time: 3 * 3600 * 1000
  },
  {
    text: '3 часа',
    time: 3 * 3600 * 1000
  },
]

const promoFunctions = [
  {
    function: async (user) => await user.add(5000),
    text: 'Промокод на 5к Т'
  },
  {
    function: async (user) => await user.add(5000),
    text: 'Промокод на 5к Т'
  },
  {
    function: async (user) => await user.add(5000),
    text: 'Промокод на 5к Т'
  },
  {
    function: async (user) => await user.add(5000),
    text: 'Промокод на 5к Т'
  },
  {
    function: async (user) => await user.add(5000),
    text: 'Промокод на 5к Т'
  },
  
  {
    function: async (user) => await user.add(10000),
    text: 'Промокод на 10к Т'
  },
  {
    function: async (user) => await user.add(10000),
    text: 'Промокод на 10к Т'
  },
  {
    function: async (user) => await user.add(10000),
    text: 'Промокод на 10к Т'
  },
  
  {
    function: async (user) => await user.add(15000),
    text: 'Промокод на 15к Т'
  },
  {
    function: async (user) => await user.add(15000),
    text: 'Промокод на 15к Т'
  },
  
  {
    function: async (user) => await user.add(20000),
    text: 'Промокод на 20к Т'
  },
  
  {
    function: async (user) => await user.add(25000),
    text: 'Промокод на 25к Т'
  },
  
  {
    function: async (user) => await user.addReputation(50),
    text: 'Промокод на 50 R'
  },
  {
    function: async (user) => await user.addReputation(50),
    text: 'Промокод на 50 R'
  },
  {
    function: async (user) => await user.addReputation(50),
    text: 'Промокод на 50 R'
  },
  {
    function: async (user) => await user.addReputation(50),
    text: 'Промокод на 50 R'
  },
  {
    function: async (user) => await user.addReputation(50),
    text: 'Промокод на 50 R'
  },
  
  {
    function: async (user) => await user.addReputation(100),
    text: 'Промокод на 100 R'
  },
  {
    function: async (user) => await user.addReputation(100),
    text: 'Промокод на 100 R'
  },
  {
    function: async (user) => await user.addReputation(100),
    text: 'Промокод на 100 R'
  },
  
  {
    function: async (user) => await user.addReputation(150),
    text: 'Промокод на 150 R'
  },
  {
    function: async (user) => await user.addReputation(150),
    text: 'Промокод на 150 R'
  },
  
  {
    function: async (user) => await user.addReputation(200),
    text: 'Промокод на 200 R'
  },
  
  {
    function: async (user) => await user.addReputation(500),
    text: 'Промокод на 500 R'
  },
  
  {
    function: async (user) => await user.addReputation(1000),
    text: 'Промокод на 1000 R'
  },
]

let CODE

fs.readFile('.temp/promo.json', (err, data) => {
  if (err) return log.error(err)
  
  data = JSON.parse(data)
  
  CODE = data.code
})

const promoFunction = async (user, time, func) => {
  if (Date.now() > time) return false
  
  await func(user)
  
  return true
}

const generate = () => {
  const key = random(10000000, 99999999)
  const n = random(0, promoFunctions.length - 1)
  const promo = promoFunctions[n]
  const timestamp = Date.now()
  const timeout = timeouts[random(0, timeouts.length - 1)]
  
  fs.writeFile('.temp/promo.json', JSON.stringify({ code: key, timestamp, n, promo, timeout }), (err) => {
    if (err) {
      log.error(err)
    } else {
      log.info('Generated new key: ' + key + '\n          Timestamp: ' + timestamp)
    }
  })
  
  return {
    code: key,
    n,
    promo,
    timestamp,
    timeout
  }
}

const getPromo = () => {  
  return require('./.temp/promo.json')
}

module.exports = {
  promoFunctions,
  promoFunction,
  generate,
  getPromo,
  CODE
}

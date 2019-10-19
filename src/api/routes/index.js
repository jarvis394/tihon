const fs = require('fs')
const path = require('path')
const { log } = require('../../globals')
const filesPath = path.resolve(process.cwd(), 'src/api/routes')

let total = 0

fs.readdirSync(filesPath).forEach(route => {
  if (route.startsWith('index')) return

  require('./' + route)
  total++
})

log.info(`Loaded ${total} routes`, { private: true })

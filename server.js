const log = require('loglevel')
const { 
  vk
} = require('./variables')

// Log incoming messages
require('./middlewares/log')

// Count them
require('./middlewares/counter')

// Add coins
require('./middlewares/coins')

// Check if user mentioned bot
require('./middlewares/mention')

// Check for prefix
require('./middlewares/prefixCheck')

// Run command
require('./middlewares/command')

// Auto send messages
require('./middlewares/auto')

// Auto accept friend requests
require('./middlewares/friends')

// Web
require('./web/index')

/**
 * Starts polling
 */
async function run() {
  await vk.updates.startPolling()
  log.info('Polling started')
}

// Run if not disabled
process.env.MODE !== 'DISABLED' && run().catch(e => {
  if (e.code == 100) return console.log('> [WARN] Api Error: 100')
  log.error(e)
})

// Handle captcha
vk.captchaHandler = async ({
  src
}) => {
  log.warn('> [LOG] Needed captcha: ' + src)
}

const { vk, log } = require('./variables')

// Listen to updates
require('./middleware/index')


/*

// Filter blacklist
require('./middleware/blacklisted')

// Log incoming messages
require('./middleware/log')

// Count them
require('./middleware/counter')

// Add coins
require('./middleware/coins')

// Check for prefix
require('./middleware/prefixCheck')

// Run command
require('./middleware/command')

// Check if user mentioned bot
require('./middleware/mention')

// Auto send messages
require('./middleware/auto')

// Auto accept friend requests
require('./middleware/friends')

// Web
require('./web/index')*/

/**
 * Starts polling
 */
async function run() {
  await vk.updates.startPolling()
  log.info('Polling started')
}

// Run if not disabled
if (process.env.MODE !== 'DISABLED') {
  run().catch(e => log.error(e))
}

// Handle captcha
vk.captchaHandler = async ({ src }) => {
  log.warn('Needed captcha: ' + src)
}

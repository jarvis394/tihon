const { vk, log } = require('./variables')

// Log incoming messages
require('./middleware/log')

// Count them
require('./middleware/counter')

// Add coins
require('./middleware/coins')

// Check if user mentioned bot
require('./middleware/mention')

// Check for prefix
require('./middleware/prefixCheck')

// Run command
require('./middleware/command')

// Auto send messages
require('./middleware/auto')

// Auto accept friend requests
require('./middleware/friends')

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
if (process.env.MODE !== 'DISABLED') {
  run().catch(e => {
    if (e.code == 100) return log.warn('Api Error: 100')
    if (e.code == 10) return log.warn('Api Error: 10')

    log.error(e)
  })
}

// Handle captcha
vk.captchaHandler = async ({ src }) => {
  log.warn('Needed captcha: ' + src)
}

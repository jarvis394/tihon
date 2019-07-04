const { vk, log } = require('./variables')

// Listen to updates
require('./middleware/index')

// Start routines
require('./routines/index')

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
  run().catch(e => log.error(e))
}

// Handle captcha
vk.captchaHandler = async ({ src }) => {
  log.warn('Needed captcha: ' + src)
}

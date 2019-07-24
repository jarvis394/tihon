const { vk, log, updates } = require('./variables')

// Listen to updates
require('./middleware')

// Start routines
require('./routines')

// Web
require('./web')

/**
 * Starts polling
 */
async function run() {
  await updates.startPolling()
  log.info('Polling started', { private: true })
}

// Run if not disabled
if (process.env.MODE !== 'DISABLED') {
  run().catch(e => log.error(e))
}

// Handle captcha
vk.captchaHandler = async ({ src }) => {
  log.warn('Needed captcha: ' + src)
}

const { VK } = require('vk-io')
const vk = new VK()
const { api, updates, collect } = vk
const log = require('../log')
const events = require('../../lib/Events')
const { TOKEN } = require('../../configs/secrets')

/**
 * Starts polling
 */
async function run() {
  await updates.startPolling()
  log.info('Polling started', { private: true })
}

// Handle captcha
vk.captchaHandler = ({ src }) => {
  log.warn('Need captcha: ' + src)
}

// Initialize VK if not disabled
if (process.env.MODE !== 'DISABLED') {
  vk.setOptions({
    token: TOKEN,
    authScope: 'all'
  })

  // Start only when data is loaded once
  events.once('getDataSuccess', () => run().catch(e => log.error(e)))
}

module.exports = {
  VK,
  vk,
  updates,
  api,
  collect
}

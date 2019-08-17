const { VK } = require('vk-io')
const vk = new VK()
const { api, updates, collect } = vk
const log = require('../log')
const { TOKEN } = require('../../configs/secrets')

// Initialize VK if not disabled
if (process.env.MODE !== 'DISABLED') {
  vk.setOptions({
    token: TOKEN,
    authScope: 'all'
  })

  /**
   * Starts polling
   */
  async function run() {
    await updates.startPolling()
    log.info('Polling started')
  }

  // Run if not disabled
  if (process.env.MODE !== 'DISABLED') {
    run().catch(e => log.error(e))
  }

  // Handle captcha
  vk.captchaHandler = async ({ src }) => {
    log.warn('Need captcha:', src)
  }
}

module.exports = {
  VK,
  vk,
  updates,
  api,
  collect
}

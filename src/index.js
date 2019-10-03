const events = require('./lib/Events')

/**
 * Load global globals and connect to databases, etc.
 * TODO: Refactor globals in the way that it will only avaliable 
 *       after /loaders are loaded 
 */
require('./globals')

require('./routines')

events.once('load', () => {
  // Start core app
  require('./packages/core')
})

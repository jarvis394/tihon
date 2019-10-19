const events = require('./lib/structures/Events')

/**
 * Load global globals and connect to databases, etc.
 * TODO: Refactor globals in the way that it will only avaliable
 *       after /loaders are loaded
 *       UPD: Or just start on event "loadersComplete" or any other.
 */
require('./globals')

// Start routines
require('./routines')

events.once('load', () => {
  // Start core app
  require('./packages/core')
})

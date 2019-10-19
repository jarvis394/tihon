const { ADMINS } = require('../configs/admins')

/**
 * Checks whether user is admin by ID
 * @param {string|number} i User ID
 */
module.exports = i => ADMINS.some(id => id.toString() === i.toString())

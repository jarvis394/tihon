/**
 * Admins list
 */
const ADMINS = [
  '437920818',
  '243763437',
  '555444315'
]

/**
 * If true then only admins defined in ADMINS can use commands
 */
const ADMIN_ONLY = (process.env.ADMIN_ONLY === 'true')

module.exports = {
  ADMIN_ONLY,
  ADMINS
}

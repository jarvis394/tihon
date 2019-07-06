/**
 * Admins list
 */
const ADMINS = [
  '437920818',
  '243763437'
]

/**
 * If true then only admins defined in ADMINS can use commands
 */
const ADMIN_ONLY = Boolean(process.env.ADMIN_ONLY)

module.exports = {
  ADMIN_ONLY,
  ADMINS
}

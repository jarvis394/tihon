/**
 * Bot ID
 */
const ID = '378852887'

/**
 * Bot prefix
 */
const PREFIX = '/'

/**
 * Mention prefix
 */
const MENTION_PREFIX = '[id' + ID + '|'

/**
 * Cooldown between commands
 */
const COMMAND_COOLDOWN = 5000

/**
 * Cooldown between /anon commands
 */
const ANON_COOLDOWN = 1000 * 60 * 2

/**
 * Interval between auto-sending random messages
 */
const AUTO_INTERVAL = 3600 * 1000

/**
 * Daily bonus for user
 */
const DAILY_BONUS = 5000

module.exports = {
  PREFIX,
  MENTION_PREFIX,
  COMMAND_COOLDOWN,
  ANON_COOLDOWN,
  AUTO_INTERVAL,
  DAILY_BONUS,
  ID
}

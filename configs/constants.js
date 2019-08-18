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
 * (3 seconds)
 */
const COMMAND_COOLDOWN = 3000

/**
 * Cooldown between /anon commands
 * (2 minmutes)
 */
const ANON_COOLDOWN = 1000 * 60 * 2

/**
 * Cooldown between /battle commands
 * (2 minutes)
 */
const BATTLE_COOLDOWN = 1000 * 60 * 2

/**
 * Interval between auto-sending random messages
 * (3 hours)
 */
const AUTO_INTERVAL = 3600 * 3 * 1000

/**
 * Interval between getting data
 * (3 hours)
 */
const DATA_GET_INTERVAL = 3600 * 6 * 1000

/**
 * Daily bonus for user
 */
const DAILY_BONUS = 5000

module.exports = {
  PREFIX,
  MENTION_PREFIX,
  COMMAND_COOLDOWN,
  ANON_COOLDOWN,
  BATTLE_COOLDOWN,
  AUTO_INTERVAL,
  DAILY_BONUS,
  DATA_GET_INTERVAL,
  ID
}

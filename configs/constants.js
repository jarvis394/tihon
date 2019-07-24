/**
 * Group ID
 */
const ID = '175388696'

/**
 * Mention prefix
 */
const MENTION_PREFIX = '[club' + ID + '|'

/**
 * Group prefix
 * Set to MENTION_PREFIX because of 
 */
const PREFIX = MENTION_PREFIX

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

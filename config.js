const chalk = require('chalk')

const TOKEN  = process.env.TOKEN
const ID     = process.env.ID
const SECRET = process.env.SECRET

const FIREBASE_TOKEN = process.env.FIREBASE_TOKEN
const FIREBASE_AUTH_DOMAIN = process.env.FIREBASE_AUTH_DOMAIN
const FIREBASE_DB_URL = process.env.FIREBASE_DB_URL
const FIREBASE_STORAGE_BUCKET = process.env.FIREBASE_STORAGE_BUCKET
const FIREBASE_SENDER_ID = process.env.FIREBASE_SENDER_ID

const prefix = '/'
const mentionPrefix = '[id' + ID + '|'
const cooldown = 5000
const anonCommandCooldown = 1000 * 60
const interval = 3600 * 1000
const DAILY_BONUS = 1000

const adminOnly = true

const colors = {
  debug: chalk.cyan,
  info: chalk.blue,
  warn: chalk.yellow,
  error: chalk.red,
  success: chalk.green,
  command: chalk.cyan
}

const customLevels = {
  error: 0,
  warn: 1,
  debug: 2,
  info: 3,
  success: 4,
  command: 5
}

module.exports = {
  TOKEN,
  ID,
  SECRET,
  prefix,
  mentionPrefix,
  cooldown,
  colors,
  interval,
  DAILY_BONUS,
  FIREBASE_TOKEN,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DB_URL,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_SENDER_ID,
  adminOnly,
  anonCommandCooldown,
  customLevels
}

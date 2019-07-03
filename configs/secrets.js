/**
 * Bot token
 */
const TOKEN = process.env.TOKEN

/**
 * Secret for secret purposes
 */
const SECRET = process.env.SECRET

/**
 * Firebase credential keys for server authentication
 */
const FIREBASE_KEYS = require('./firebaseKeys.json')

/**
 * Firebase database's URL
 */
const FIREBASE_DB_URL = process.env.FIREBASE_DB_URL

module.exports = {
  TOKEN,
  SECRET,
  FIREBASE_KEYS,
  FIREBASE_DB_URL
}

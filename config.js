const TOKEN  = process.env.TOKEN
const ID     = process.env.ID
const SECRET = process.env.SECRET

const FIREBASE_TOKEN = process.env.FIREBASE_TOKEN
const FIREBASE_AUTH_DOMAIN = process.env.FIREBASE_AUTH_DOMAIN
const FIREBASE_DB_URL = process.env.FIREBASE_DB_URL
const FIREBASE_STORAGE_BUCKET = process.env.FIREBASE_STORAGE_BUCKET
const FIREBASE_SENDER_ID = process.env.FIREBASE_SENDER_ID

const prefix = "/"
const mentionPrefix = "[id" + ID + "|"
const cooldown = 2500

module.exports = {
  TOKEN,
  ID,
  SECRET,
  prefix,
  mentionPrefix,
  cooldown,
  FIREBASE_TOKEN,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DB_URL,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_SENDER_ID
}

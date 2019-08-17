const { FIREBASE_KEYS, FIREBASE_DB_URL } = require('../../configs/secrets')
const firebase = require('firebase-admin')

// Initialize Firebase app
firebase.initializeApp({
  credential: firebase.credential.cert(FIREBASE_KEYS),
  databaseURL: FIREBASE_DB_URL
})

module.exports = {
  firebase
}

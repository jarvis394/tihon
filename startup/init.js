const { VK } = require('vk-io')
const vk = new VK()
const { api, updates } = vk
const { TOKEN, FIREBASE_KEYS, FIREBASE_DB_URL } = require('../configs/secrets')

const firebase = require('firebase-admin')

firebase.initializeApp({
  credential: firebase.credential.cert(FIREBASE_KEYS),
  databaseURL: FIREBASE_DB_URL
})

// Initialize VK
vk.setOptions({
  token: TOKEN,
  authScope: 'all'
})

module.exports = {
  VK,
  vk,
  updates,
  api,
  firebase
}

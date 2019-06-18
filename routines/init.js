const {
  VK
} = require('vk-io')
const vk = new VK
const {
  api,
  updates
} = vk
const {
  TOKEN,
  FIREBASE_DB_URL,
} = require('../config')

const firebase = require('firebase-admin')
const keys = require('../firebaseKeys.json')

firebase.initializeApp({
  credential: firebase.credential.cert(keys),
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

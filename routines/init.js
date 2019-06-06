const {
  VK
} = require('vk-io')
const firebase = require('firebase')
const vk = new VK
const {
  api,
  updates
} = vk
const {
  TOKEN,
  FIREBASE_TOKEN,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DB_URL,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_SENDER_ID
} = require('../config')

// Initialize Firebase
firebase.initializeApp({
  apiKey: FIREBASE_TOKEN,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DB_URL,
  projectId: 'ded-tihon',
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_SENDER_ID
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

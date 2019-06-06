const memoryStorage = new Map() // Saves counter to every dialog
const talkedRecently = new Set() // Saves users that talked recently
const randomStorage = new Map() // Saves previous random messages

const express = require('express')
const app = express()

const {
  VK,
  vk,
  api,
  updates,
  firebase,
  commands
} = require('./routines/index')

module.exports = {
  memoryStorage,
  talkedRecently,
  randomStorage,
  commands,
  app,
  VK,
  vk,
  api,
  updates,
  firebase
}
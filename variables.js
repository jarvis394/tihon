const {
  VK,
  vk,
  api,
  updates,
  firebase,
  commands
} = require('./routines/index')

const memoryStorage = new Map() // Saves counter to every dialog
const talkedRecently = new Set() // Saves users that talked recently
const anonCommandTimeout = new Map() // Saves users that recently used /anon
const randomStorage = new Map() // Saves previous random messages
const users = new Map()

const express = require('express')
const app = express()

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
  firebase,
  users,
  anonCommandTimeout
}
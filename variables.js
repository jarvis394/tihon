const {
  VK,
  vk,
  api,
  updates,
  firebase,
  commands,
  log
} = require('./startup/index')

const Container = require('./lib/Container')

const memoryStorage = new Map() // Saves counter to every dialog
const talkedRecently = new Set() // Saves users which talked recently
const anonCommandTimeout = new Map() // Saves users which recently used /anon
const battleCommandTimeout = new Map() // Saves users which recently used /battle
const randomStorage = new Map() // Saves previous random messages
const users = new Container(25)

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
  anonCommandTimeout,
  battleCommandTimeout,
  log
}

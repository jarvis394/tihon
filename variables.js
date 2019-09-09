const init = require('./startup')
const { api } = init
const RequestsQueue = require('./lib/RequestsQueue')

// const Container = require('./lib/Container')

/**
 * Saves counter to every dialog
 */
const memoryStorage = new Map()

/**
 * Saves users which talked recently
 */
const talkedRecently = new Set()

/**
 * Saves users which recently used /anon
 */
const anonCommandTimeout = new Map()

/**
 * Saves users which recently used /battle
 */
const battleCommandTimeout = new Map()

/**
 * Saves previous random messages
 */
const randomStorage = new Map()

/**
 * Saves requests for captcha handling
 */
const requestsQueue = new RequestsQueue(api)

const express = require('express')
const app = express()

module.exports = {
  ...init,
  memoryStorage,
  talkedRecently,
  randomStorage,
  app,
  anonCommandTimeout,
  battleCommandTimeout,
  requestsQueue,
}

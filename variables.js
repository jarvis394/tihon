const init = require('./startup')
const { api } = init
const RequestsQueue = require('./lib/RequestsQueue')

/**
 * Saves counter to every dialog
 */
const memoryStorage = new Map()

/**
 * Saves users which talked recently
 */
const talkedRecently = new Set()

/**
 * Saves timeouts for commands
 */
const timeouts = new Map()

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
  app,
  requestsQueue,
  timeouts,
}

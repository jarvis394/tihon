const init = require('./loaders')
const { api } = init
const RequestsQueue = require('./lib/RequestsQueue')
const CommandsQueue = require('./lib/CommandsQueue')
const express = require('express')

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

/**
 * Commands queue for workers
 */
const commandsQueue = new CommandsQueue()

/**
 * Express web app
 */
const app = express()

module.exports = {
  ...init,
  memoryStorage,
  talkedRecently,
  app,
  requestsQueue,
  timeouts,
  commandsQueue,
}

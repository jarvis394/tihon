const cluster = require('cluster')
const path = require('path')
const events = require('../../lib/Events')
const { commandsQueue } = require('../../globals')
const handlerExecPath = path.resolve(
  process.cwd(),
  'src/packages/handler/index.js'
)
const forksAmount = 2

let workers = {}

/**
 * Handles worker's message
 * @param {string} message Message
 */
function messageHandler({ worker, message }) {
  if (message === 'working') {
    workers[worker.process.pid].state.working = message.working
  }
}

// Setup the main execution file
cluster.setupMaster({ exec: handlerExecPath })

// Notify that worker is listening
cluster.on('online', worker => {
  console.log('Message handler on PID ' + worker.process.pid + ' is listening')
})

// If any of the worker process dies then start a new one by simply forking another one
cluster.on('exit', (worker, code, signal) => {
  console.log(
    'Message handler on PID ' +
      worker.process.pid +
      ' died with code: ' +
      code +
      ', and signal: ' +
      signal
  )
  console.log('Starting a new worker')

  const fork = cluster.fork()
  workers[fork.process.pid] = {
    process: fork,
    state: {
      working: false
    }
  }

  // To receive messages from worker process
  fork.process.on('message', message => messageHandler({ 
    process: workers[fork.process.pid],  
    message 
  }))
})

// Fork workers
for (let i = 0; i < forksAmount; i++) {
  const fork = cluster.fork()
  workers[fork.process.pid] = {
    process: fork,
    state: {
      working: false
    }
  }

  // To receive messages from worker process
  fork.process.on('message', message => messageHandler({ 
    process: workers[fork.process.pid],  
    message 
  }))
}

events.on('executeCommand', update => {
  for (const pid in workers) {
    const { process, state } = workers[pid]

    if (!state.working) {
      return process.emit('executeCommand', update)
    }
  }
})

// Start middlewares
require('./middlewares')

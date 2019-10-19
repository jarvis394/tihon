const cluster = require('cluster')
const path = require('path')
const events = require('../../lib/structures/Events')
const { commandsQueue: queue } = require('../../globals')
const handlerExecPath = path.resolve('src/packages/handler/index.js')
const forksAmount = 5

let workers = {}

class Worker {
  constructor(process) {
    this.process = process
    this.pid = process.process.pid
    this.state = {
      busy: false,
    }
  }

  isBusy() {
    return this.state.busy
  }

  setBusyState(state) {
    return (this.state.busy = state)
  }

  send(message) {
    return this.process.send(message)
  }
}

/**
 * Handles worker's message
 * @param {string} message Message
 */
function messageHandler({ worker, message }) {
  if (message.busy !== null) {
    workers[worker.pid].setBusyState(message.busy)
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
  workers[fork.process.pid] = new Worker(fork)

  // To receive messages from worker process
  fork.process.on('message', message =>
    messageHandler({
      process: workers[fork.process.pid],
      message,
    })
  )
})

// Fork workers
for (let i = 0; i < forksAmount; i++) {
  const fork = cluster.fork()
  workers[fork.process.pid] = new Worker(fork)

  // To receive messages from worker process
  fork.process.on('message', message =>
    messageHandler({
      worker: workers[fork.process.pid],
      message,
    })
  )
}

// Process queue
setInterval(async () => await processQueue(), 0)

// Push commands to the queue on event
events.on('executeCommand', async update => queue.push(update))

async function processQueue() {
  if (!queue.isEmpty) {
    for (const pid in workers) {
      const worker = workers[pid]
      if (worker.isBusy()) continue
      
      const update = queue.shift()

      worker.setBusyState(true)
      worker.send({ isCommand: true, update: update.payload, state: update.state })
      break
    }
  }
}

// Start middlewares
require('./middlewares')

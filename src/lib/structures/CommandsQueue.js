class CommandsQueue {
  constructor() {
    this.queue = []
  }

  get length() {
    return this.queue.length
  }

  get isEmpty() {
    return this.queue.length === 0
  }

  push(update) {
    return this.queue.push(update)
  }

  shift() {
    return this.queue.shift()
  }

  unshift(update) {
    return this.queue.unshift(update)
  }
}

module.exports = CommandsQueue

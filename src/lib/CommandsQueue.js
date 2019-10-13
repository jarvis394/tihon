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
    this.queue.push(update)
  }

  shift() {
    return this.queue.shift()
  }

  unshift(update) {
    this.queue.unshift(update)
  }
}

module.exports = CommandsQueue

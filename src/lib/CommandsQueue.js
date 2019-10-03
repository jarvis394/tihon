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
}

module.exports = CommandsQueue

class CaptchaQueue {
  constructor() {
    this.queue = []
  }

  get length() {
    return this.queue.length
  }
}

module.exports = CaptchaQueue

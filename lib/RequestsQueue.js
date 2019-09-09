// const { api } = require('../startup/init/vk')
const log = require('../startup/log')

class RequestsQueue {
  constructor(api) {
    this.queue = []
    this.api = api
  }
  
  get length() {
    return this.queue.length
  }
  
  get isEmpty() {
    return this.queue.length === 0
  }
  
  add(request) {
    this.queue.push(request)
    console.log(this.queue.length)
  }
  
  /*async processPart() {
    const requests = this.queue.splice(0, 25)
    const response = await collect.executes('messages.send', requests)
    
    console.log(response)
    
    return response
  }*/
  
  async processNext() {
    const request = this.queue.shift()
    log.info('Retrying request', request)
    
    const response = await this.api.callWithRequest(request)
    
    log.info(response)
    
    return response
  }
}

module.exports = RequestsQueue
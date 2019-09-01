/* eslint-disable no-undef */

const randomMessage = require('../utils/randomMessage')
const readline = require('reverse-line-reader')

describe('Random message logging', () => {
  test('should be same', async () => {
    const message = await randomMessage()

    let line = ''
    readline.eachLine('logs/main.log', (l) => {
      line = JSON.parse(l)

      expect(message.text).toBe(line.message.text)
      return false
    })
  })
})
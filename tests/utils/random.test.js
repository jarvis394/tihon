/* eslint-disable no-undef */
const array = [1, 2, 3]
const n1 = 10
const n2 = 100

describe('utils: random', () => {
  const { random } = require('../../src/utils/random')

  test('should return a number', async () => {
    const result = random(n1)

    expect(result).not.toBeNaN()
  })

  test('should return a number in range(0, 1) when called without args', async () => {
    const result = random()

    expect(result).not.toBeNaN()
    expect(result).toBeGreaterThanOrEqual(0)
    expect(result).toBeLessThanOrEqual(1)
  })

  test('should work with a range', async () => {
    const result = random(n1, n2)

    expect(result).not.toBeNaN()
    expect(result).toBeGreaterThanOrEqual(n1)
    expect(result).toBeLessThanOrEqual(n2)
  })
})

describe('utils: randomArray', () => {
  const { randomArray } = require('../../src/utils/random')

  test('should work with arrays', async () => {
    const result = randomArray(array)

    expect(result).not.toBeNaN()
  })
})

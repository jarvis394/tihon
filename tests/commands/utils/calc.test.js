/* eslint-disable no-undef */

const n1 = 5,
  n2 = 100

const gen = async ({ update = {}, args = [] }) => {
  const cmd = require('../../../src/commands/utils/calc')

  return await cmd.run.bind(null, {
    update,
    args,
  })
}

describe('/calc command', () => {
  test('should execute without errors', async () => {
    const g = await gen({ args: ['2+2'] })

    expect(await g()).toContain('4')
  })

  test('should throw on not an expression', async () => {
    const g = await gen({ args: ['qwerty'] })

    expect(g()).rejects.toThrow(Error)
  })
})

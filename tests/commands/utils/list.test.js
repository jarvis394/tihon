/* eslint-disable no-undef */

jest.mock('../../../src/globals')

const gen = async ({ update = {}, args = [], mentionCmdState = false }) => {
  const cmd = require('../../../src/commands/utils/list')

  return await cmd.run.bind(null, {
    update,
    args,
    mentionCmdState,
  })
}

test('should execute without errors', async () => {
  const g = await gen({ args: ['qwerty'] })

  expect(await g()).toContain('qwerty')
  expect(await g()).toMatch(/[Dan|Nick|Kevin]/gi)
})

test('should execute without args', async () => {
  const g = await gen({ args: [] })

  expect(await g()).toMatch(/[Dan|Nick|Kevin]/gi)
})

test('should execute with mentions state', async () => {
  const g = await gen({ args: ['list'], mentionCmdState: true })

  expect(await g()).toMatch(/\[id[1|2|3]\|[Dan|Nick|Kevin]/gi)
})

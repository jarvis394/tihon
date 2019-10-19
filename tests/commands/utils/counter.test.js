/* eslint-disable no-undef */

const gen = ({ update = {}, args = [] }) =>
  require('../../../src/commands/utils/counter').run.bind(null, {
    update,
    args,
  })

describe('/counter command', () => {
  test('should execute without errors', async () => {
    expect(
      await gen({ update: { state: { session: { counter: 1 } } } })()
    ).toContain(1)
  })
})

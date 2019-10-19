/* eslint-disable no-undef */

describe('/rate command', () => {
  test('should execute without errors', async () => {
    expect(
      await require('../../../src/commands/utils/rate').run.bind(null, {
        update: null,
        args: null,
      })
    ).not.toThrow()
  })
})

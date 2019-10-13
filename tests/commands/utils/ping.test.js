/* eslint-disable no-undef */

describe('/ping command', () => {
  test('should execute without errors', async () => {
    expect(
      await require('../../../src/commands/utils/ping').run.bind(null, {
        update: null,
        args: null,
      })
    ).not.toThrow()
  })
})

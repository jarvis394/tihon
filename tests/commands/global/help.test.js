/* eslint-disable no-undef */

describe('/help command', () => {
  test('should execute without errors', async () => {
    expect(
      await require('../../../src/commands/global/help').run({
        update: null,
        args: null,
      })
    ).toEqual('🔍 Смотри команды на сайте: https://dedtihon.cf')
  })
})

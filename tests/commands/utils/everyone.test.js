/* eslint-disable no-undef */

jest.mock('../../../src/globals')

const gen = ({ update = {}, args = [] }) =>
  require('../../../src/commands/utils/everyone').run.bind(null, {
    update,
    args,
  })

describe('/everyone command', () => {
  test('should work without errors', async () => {
    expect(
      await gen({
        update: {
          peerId: 20000001,
          senderId: 1,
        },
        args: [],
      })
    ).not.toThrow()
  })

  test('should throw when user is not admin', async () => {
    expect(
      gen({
        update: {
          peerId: 20000001,
          senderId: 2,
        },
        args: [],
      })()
    ).rejects.toThrow(Error)
  })
})

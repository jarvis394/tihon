/* eslint-disable */

const store = require("store")
// const Coins = require("../lib/Coins")

store.set("foo", {
  amount: 0
})

describe("Adding coins", () => {
  test('should add 1 coin to user', () => {
    let user = store.get("foo")
    user.amount++
    store.set("foo", user)

    expect(store.get("foo").amount).toBe(1)
  })
})
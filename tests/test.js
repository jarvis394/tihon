/* eslint-disable */

const {
  VK
} = require("vk-io")

const vk = new VK
const {
  api
} = vk

const { TOKEN } = require("../config")

vk.setOptions({
  token: TOKEN
})

describe("Testing tests", () => {

  test("token should be a string", () => {
    let t = typeof TOKEN === "string"
    expect(t).toBeTruthy()
  })
  
})
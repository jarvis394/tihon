/* eslint-disable no-unused-vars */
const randomArray = (array) => {
  return array[Math.floor(Math.random() * array.length)]
}

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


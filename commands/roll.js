const { handleError } = require("../utils")

const {
  random
} = require("../utils")

exports.run = async (api, update, args) => {
  try {
    let res = random(0, 100)

    // /roll 10
    if (args[0] && !args[1] && !isNaN(args[0])) {
      res = random(0, args[0])
    } else if (args[0] && args[1] && (!isNaN(args[0]) && !isNaN(args[1]))) {
      res = random(args[0], args[1])
    }

    await update.send(res)
  } catch (e) {
    handleError(update, e)
  }
}

exports.command = {
  "name": "roll",
  "arguments": "(min) (max)|(min) (max)",
  "description": {
    "en": "Roll from 0 (or min) to 100 (or max)",
    "ru": "Ролл от 0 (или min) до 100 (или max)"
  }
}
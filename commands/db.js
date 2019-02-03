const {
  handleError
} = require("../utils")

const {
  dbSet,
  dbUpdate,
  dbGet,
  dbDialogGet,
  dbDialogSet,
  dbDialogUpdate
} = require("../utils");

exports.run = async (api, update, args) => {
  try {

  } catch (e) {
    handleError(update, e);
  }
}

exports.command = {
  "name": "db",
  "arguments": false,
  "description": {
    "en": "Testing database",
    "ru": "Testing database"
  }
}
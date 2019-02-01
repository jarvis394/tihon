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

    await dbGet("/").then(data => {
      console.log(data)
    });
    await dbDialogGet('437920818', '70').then(data => {
      console.log(data)
    });

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
const firebase = require("firebase");
const db = firebase.firestore();

const {
  ADMIN_ID
} = require("../config")

const {
  handleError
} = require("../utils")

exports.run = async (api, update, args) => {
  try {

    console.log(update)
    
    if (update.senderId !== ADMIN_ID) return update.send("Права ауе")
    
  } catch (e) {
    handleError(update, e)
  }
}

exports.command = {
  "name": "test",
  "arguments": false,
  "description": {
    "en": "tests",
    "ru": "tests"
  }
}
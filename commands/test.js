const firebase = require("firebase");
const db = firebase.firestore();

const { handleError } = require("../utils");

exports.run = async (api, update, args) => {
  try {
    
    db.collection("users").doc("123").set({
      first: "Ada",
      last: "Lovelace",
      born: 1815
    })
    
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
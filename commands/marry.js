const { handleError } = require("../utils");

const firebase = require("firebase");
const db = firebase.firestore();

exports.run = async (api, update, args) => {
  try {

    if (!args[0] || !args[0].startsWith("[id")) 
      return show()
    
    let person = args[0].slice(3).split("|")[0]
    
    await marryWith(person, update.fromId)
    update.send("Теперь [id" + person + "|Person] и [id" + update.fromId + "|Husband] женаты!")

  } catch (e) {
    handleError(update, e)
  }
  
  async function marryWith(husband, person) {
    db.collection("marries").doc(`${person}`).set({
      husband: husband,
      date: Date.now()
    })
  }
  
  async function show() {
    db.collection("marries").doc(`${update.fromId}`).get().then(doc => {
      console.log(doc.data())
      update.send(doc.data())
    })
  }
}

exports.command = {
  "name": "marry",
  "arguments": false,
  "description": {
    "en": "Marry with someone",
    "ru": "Пожениться с человеком (или нет)"
  }
}
const { handleError } = require("../utils")

const replies = [
  "Я думаю, что",
  "Мб",
  "Хз, но",
  "Наверное"
]
const {
  randomArray
} = require("../utils")

exports.run = async (api, update, args) => {
  try {
    let person = await api.messages.getConversationMembers({
      peer_id: update.peerId,
      fields: "first_name, last_name"
    })
    
    person = randomArray(person.profiles)
    
    await update.send(`${randomArray(replies)}${args.length !== 0 ? " " + args.join(" ") : ""} это [id${person.id}|${person.first_name + " " + person.last_name}]`)
  } catch (e) {
    handleError(update, e)
  }
}

exports.command = {
  "name": "who",
  "arguments": "(arg)|(предл.)",
  "description": {
    "en": "Who is ***?",
    "ru": "Кто ***?"
  },
  "alias": [
    "кто",
    "назови"
  ]
}
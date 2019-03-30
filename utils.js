const DBDialog = require("./lib/DBDialog")

const firebase = require("firebase")
const db = firebase.firestore()

/**
 * Returns random item from array
 * 
 * @param {array} array Array
 * @returns {any} Item from array
 */
const randomArray = (array) => {
  return array[Math.floor(Math.random() * array.length)]
}

/**
 * Returns random value between min and max
 * 
 * @param {value} min Minimum
 * @param {value} max Maximum
 * @returns {value} Random value
 */
const random = (min, max) => {
  var rand = min - 0.5 + Math.random() * (max - min + 1)
  rand = Math.round(rand)
  return rand
}

/**
 * Returns random message from multidialogs
 * 
 * @param {object} api Api object
 * @returns {object} Message object
 */
const randomMessage = async (api) => {
  // Get dialogs
  var Dialogs = await api.messages.getConversations({
    count: 200
  })

  async function getMsg() {
    var Dialog = randomArray(Dialogs.items)

    const dialog = new DBDialog(Dialog.conversation.peer.id)
    const data = dialog.checkData()

    while (data.no) {
      Dialog = randomArray(Dialogs.items)
    }

    var Messages = await api.messages.getHistory({
      peer_id: Dialog.conversation.peer.id
    })
    var Message = randomArray(Messages.items)

    return Message
  }

  let msg = await getMsg()
  let ir = await db.collection("reported").where("id", "==", parseInt(msg.id)).get()
  let flag = 0

  ir.forEach(() => {
    flag = true
  })

  while (
    (
      msg.attachments.length === 0 &&
      (msg.text === "" || !msg.text)
    ) ||
    msg.text.split(" ").some(t => t.startsWith("http") || t.startsWith("+7")) ||
    msg.text.startsWith("/") ||
    msg.text.startsWith("АШИБКА РИП.") ||
    msg.text.length > 500 ||
    msg.from_id.toString() === process.env.ID.toString() ||

    flag
  ) {
    msg = await getMsg()

    ir = await db.collection("reported").where("id", "==", parseInt(msg.id)).get()
    flag = 0

    ir.forEach(() => {
      flag = true
    })
  }

  return msg
}

const log = async (msg, peer) => {
  // eslint-ignore-no-console
  console.log(`> [LOG] ${msg} ${peer ? "| " + peer : ""}`)
}

const error = async (msg, path) => {
  console.error(`> [ERR] ${path ? `In ${path}: ` : ""}${msg}`)
}

const captcha = async (msg) => {
  console.warn(msg)
}

/**
 * Handles error
 * @param {object} update Update object
 * @param {object} e Error object
 */
const handleError = (update, e) => {
  error("Error with command '" + update.text + "': " + e)

  update.send("АШИБКА РИП. \n❌ " + e.stack.split(" ")[0] + " " + e.message)
}

module.exports = {
  randomArray,
  random,
  randomMessage,
  handleError,
  log,
  error,
  captcha
}
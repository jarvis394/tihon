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
  let Dialogs = await api.messages.getConversations({
    count: 200
  })

  async function getMsg() {
    let Dialog = randomArray(Dialogs.items)

    const dialog = new DBDialog(Dialog.conversation.peer.id)
    const data = dialog.checkData()

    while (data.no) {
      Dialog = randomArray(Dialogs.items)
    }

    let Messages = await api.messages.getHistory({
      peer_id: Dialog.conversation.peer.id
    })
    let Message = randomArray(Messages.items)

    return Message
  }

  let msg = await getMsg()
  let isReported = await db.collection("reported").where("id", "==", parseInt(msg.id)).get()
  let flag = 0

  isReported.forEach(() => {
    flag = true
  })

  while (testMessage(msg)) {
    msg = await getMsg()

    isReported = await db.collection("reported").where("id", "==", parseInt(msg.id)).get()
    flag = 0

    isReported.forEach(() => {
      flag = true
    })
  }

  return msg
  
  // Testing functions //
  const isEmpty = (t) => t.attachments.length === 0 && (t.text === "" || !t.text)
  const startsWithLink = (t) => msg.text.split(" ").some(t => t.startsWith("http"))
  const startsWithPhone = (t) => msg.text.split(" ").some(t => t.startsWith("+7"))
  const isCommandMessage = (t) => msg.text.split(" ").some(t => t.startsWith("/"))
  const isErrorMessage = (t) => msg.text.split(" ").some(t => t.startsWith("АШИБКА РИП"))
  const isLong = (t) => msg.text.length > 200
  const isSelf = (t) => t.from_id.toString() === process.env.ID.toString()
  
  const testMessage = (t) => {
    return isEmpty(t) || 
      startsWithLink(t) || 
      startsWithPhone(t) || 
      isCommandMessage(t) || 
      isErrorMessage(t) || 
      isLong(t) || 
      isSelf(t) || 
      flag
  }
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
  
  process.env.MODE === "PRODUCTION" && update.send("АШИБКА РИП. \n❌ " + e.stack.split(" ")[0] + " " + e.message)
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
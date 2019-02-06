const fs = require("fs");
const no = JSON.parse(fs.readFileSync("./no.json", "utf8"));
const firebase = require("firebase");
const db = firebase.app().database();

/**
 * Returns random item from array
 * 
 * @param {array} array Array
 * @returns {any} Item from array
 */
const randomArray = (array) => {
  return array[Math.floor(Math.random() * array.length)];
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
  rand = Math.round(rand);
  return rand;
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
  });

  async function getMsg() {
    var Dialog = Dialogs.items[Math.floor(Math.random() * Dialogs.items.length)]

    while (no[Dialog.conversation.peer.id]) {
      Dialog = Dialogs.items[Math.floor(Math.random() * Dialogs.items.length)]
    }

    var Messages = await api.messages.getHistory({
      peer_id: Dialog.conversation.peer.id
    });
    var Message = Messages.items[Math.floor(Math.random() * Messages.items.length)]

    return Message;
  }

  var msg = await getMsg();

  while (
    (msg.attachments.length === 0 &&
      msg.text === "") ||
    msg.text.split(" ").some(t => t.startsWith("http")) ||
    msg.text.startsWith("/") ||
    msg.text.length > 500 ||
    msg.from_id === process.env.ID
  ) {
    msg = await getMsg();
  }

  return msg;
}

/**
 * Handles error
 * @param {object} update Update object
 * @param {object} e Error object
 */
const handleError = (update, e) => {
  console.error("> [ERR] Error with command '" + update.text + "':\n", e);
  update.send("АШИБКА РИП. \n❌ " + e.stack.split(" ")[0] + " " + e.message);

  
}

/**
 * Set data to database
 * @param {string} path Path
 * @param {any} data Data to set
 */
const dbSet = async (path, data) => {
  await db.ref(path).set(data);
}

/**
 * Update data in database
 * @param {string} path Path
 * @param {any} data Data to update
 */
const dbUpdate = async (path, data) => {
  await db.ref(path).update(data);
}

/**
 * Get data from database
 * @param {string} path Path
 */
const dbGet = async (path) => {
  let data;
  await db.ref(path).once("value", (d) => data = d.val());

  return data;
}

/**
 * Get data from dialogs in database
 * @param {string} path Path
 * @param {string} peer PeerID of the dialog
 */
const dbDialogGet = async (path, peer) => {
  let data;
  await db.ref("dialogs/" + peer + "/" + path).once("value", (d) => data = d.val());

  return data;
}

/**
 * Set data to dialogs in database
 * @param {string} path Path
 * @param {string} peer PeerID of the dialog
 * @param {any} data Data to set
 */
const dbDialogSet = async (path, peer, data) => {
  await db.ref("dialogs/" + peer + "/" + path).set(data)
}

/**
 * Update data in dialogs in database
 * @param {string} path Path
 * @param {string} peer PeerID of the dialog
 * @param {any} data Data to update
 */
const dbDialogUpdate = async (path, peer, data) => {
  await db.ref("dialogs/" + peer + "/" + path).update(data)
}

const log = async (msg) => {
  let date = Date.now();

  await db.ref("log/messages/" + date).set(msg)

  console.log(msg)
}

const error = async (msg) => {
  let date = Date.now();

  await db.ref("log/errors/" + date).set(msg)

  console.error(msg)
}

const captcha = async (msg) => {
  let data;

  await db.ref("log/captcha").once("value", (d) => data = d.val());
  await db.ref("log/captcha").set(data++)

  console.error(msg)
}

module.exports = {
  randomArray,
  random,
  randomMessage,
  handleError,
  dbSet,
  dbGet,
  dbUpdate,
  dbDialogGet,
  dbDialogSet,
  dbDialogUpdate,
  log,
  error,
  captcha
}
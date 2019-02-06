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
module.exports.randomArray = (array) => {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Returns random value between min and max
 * 
 * @param {value} min Minimum
 * @param {value} max Maximum
 * @returns {value} Random value
 */
module.exports.random = (min, max) => {
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
module.exports.randomMessage = async (api) => {
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
module.exports.handleError = (update, e) => {
  console.error("> [ERR] Error with command '" + update.text + "':\n", e);
  update.send("АШИБКА РИП. \n❌ " + e.stack.split(" ")[0] + " " + e.message);
}

/**
 * Set data to database
 * @param {string} path Path
 * @param {any} data Data to set
 */
module.exports.dbSet = async (path, data) => {
  await db.ref(path).set(data);
}

/**
 * Update data in database
 * @param {string} path Path
 * @param {any} data Data to update
 */
module.exports.dbUpdate = async (path, data) => {
  await db.ref(path).update(data);
}

/**
 * Get data from database
 * @param {string} path Path
 */
module.exports.dbGet = async (path) => {
  let data;
  await db.ref(path).once("value", (d) => data = d.val());

  return data;
}

/**
 * Get data from dialogs in database
 * @param {string} path Path
 * @param {string} peer PeerID of the dialog
 */
module.exports.dbDialogGet = async (path, peer) => {
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
module.exports.dbDialogSet = async (path, peer, data) => {
  await db.ref("dialogs/" + peer + "/" + path).set(data)
}

/**
 * Update data in dialogs in database
 * @param {string} path Path
 * @param {string} peer PeerID of the dialog
 * @param {any} data Data to update
 */
module.exports.dbDialogUpdate = async (path, peer, data) => {
  await db.ref("dialogs/" + peer + "/" + path).update(data)
}

module.exports.log = async (msg) => {
  let date = Date.now();

  await db.ref("log/messages/" + date).set({
    msg: msg,
    type: "message"
  })

  console.log(msg)
}

module.exports.error = async (msg) => {
  let date = Date.now();

  await db.ref("log/errors/" + date).set({
    msg: msg,
    type: "error"
  })

  console.error(msg)
}

module.exports.captcha = async (msg) => {
  let date = Date.now();

  await db.ref("log/captcha/" + date).set({
    msg: msg,
    type: "error"
  })

  console.error(msg)
}
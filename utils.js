const fs = require("fs");
const no = JSON.parse(fs.readFileSync("./no.json", "utf8"));

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
  return update.send("АШИБКА РИП. \n❌ " + e.stack.split(" ")[0] + " " + e.message);
}

/**
 * Write value to ./settings.json
 * 
 * @param {any} name Name of the field
 * @param {any} value Value to write
 */
module.exports.writeSettings = (name, value) => {
  let settings = JSON.parse(fs.readFileSync("./settings.json", "utf8")); // Get
  settings[name] = value; // Update

  // Write
  fs.writeFile("./settings.json", JSON.stringify(settings, null, 2), (err) => {
    if (err) return console.log(err);
  });
}

/**
 * Get user's settings from ./settings.json
 * 
 * @param {any} name Name of the field
 * @param {value} peer peer_id of the dialog
 * @returns {any} Field
 */
module.exports.getSettings = (name, peer) => {
  let settings = JSON.parse(fs.readFileSync("./settings.json", "utf8"))

  if (peer && settings[peer])
    return settings[peer][name];
  if (peer && !settings[peer]) {
    settings[peer] = {};

    // Write
    fs.writeFile("./settings.json", JSON.stringify(settings, null, 2), (err) => {
      if (err) return console.log(err);
    });

    return settings[peer][name];
  } else
    return settings[name];
}
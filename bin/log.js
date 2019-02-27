const {
  prefix,
  cooldown
} = require("../config");

const {
  log,
  handleError
} = require("../utils")

module.exports = (updates, memoryStorage, talkedRecently, cmds) => updates.on('message', async (context, next) => {
  try {
  let {
    peerId,
    text,
    senderId
  } = context;

  if (talkedRecently.has(senderId)) return;

  if (text && text.startsWith(prefix) && cmds.some(el => el.name.startsWith(text.split(" ")[0].slice(prefix.length)))) {
    log(text, peerId);

    talkedRecently.add(senderId);
    setTimeout(() => {
      // Removes the user from the set after 2.5 seconds
      talkedRecently.delete(senderId);
    }, cooldown);
  }

  let session = memoryStorage.has(peerId) ?
    memoryStorage.get(peerId) : {};

  context.state.session = session;

  await next();

  memoryStorage.set(peerId, session);
  } catch(e) {
    handleError(context, e)
    console.log("@")
  }
});
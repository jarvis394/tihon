const {
  prefix,
  cooldown
} = require("../config");

const { log } = require("../utils")

module.exports = (updates, memoryStorage, talkedRecently) => updates.on('message', async (context, next) => {
  let {
    peerId,
    text,
    senderId
  } = context;

  if (talkedRecently.has(senderId)) return;

  if (text && text.startsWith(prefix)) {
    log("> [LOG]", text, "|", peerId);

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
});
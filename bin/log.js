const {
  prefix,
  cooldown
} = require("../constants");

module.exports = (updates, memoryStorage, talkedRecently) => updates.on('message', async (context, next) => {
  if (talkedRecently.has(context.senderId))
    return;

  let {
    peerId,
    text
  } = context;

  if (text && text.startsWith(prefix) && context.isInbox) {
    console.log("> [LOG]", text, "|", peerId);

    talkedRecently.add(context.senderId);
    setTimeout(() => {
      // Removes the user from the set after 2.5 seconds
      talkedRecently.delete(context.senderId);
    }, cooldown);
  }

  let session = memoryStorage.has(peerId) ?
    memoryStorage.get(peerId) : {};

  context.state.session = session;

  await next();

  memoryStorage.set(peerId, session);
});
const {
  prefix,
  cooldown,
  ID
} = require("../config")

const {
  log,
  handleError
} = require("../utils")

module.exports = (updates, memoryStorage, talkedRecently) => updates.on("message", async (context, next) => {
  try {
    let {
      peerId,
      text,
      senderId
    } = context

    if (talkedRecently.has(senderId)) return

    if (text && (text.startsWith(prefix) || text.startsWith("[id" + ID))) {
      log(text, peerId)

      talkedRecently.add(senderId)
      setTimeout(() => {
        // Removes the user from the set after delay
        talkedRecently.delete(senderId)
      }, cooldown)
    }

    let session = memoryStorage.has(peerId) ?
      memoryStorage.get(peerId) : {}

    context.state.session = session

    await next()

    memoryStorage.set(peerId, session)
  } catch(e) {
    handleError(context, e)
  }
})
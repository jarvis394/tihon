const { prefix } = require("../constants");

module.exports = (updates, memoryStorage) => updates.on('message', async (context, next) => {
	let { peerId, text } = context;
  
  if (text && text.startsWith(prefix)) console.log("> [LOG]", text, "|", context.peerId);

	let session = memoryStorage.has(peerId)
		? memoryStorage.get(peerId)
		: {};

	context.state.session = session;

  await next();
  
	memoryStorage.set(peerId, session);
});
const { prefix } = require("../constants.js");

module.exports = (updates) => updates.on('message', async (update, next) => {
	if (update.isOutbox) return;
  else {
	  let message = update.text;
    
    if (message == "" || !message) return;
    if (!message.startsWith(prefix)) return;
    await next();
  }
});
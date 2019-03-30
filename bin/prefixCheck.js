const { prefix, mentionPrefix } = require("../config");

module.exports = (updates) => updates.on('message', async (update, next) => {
	if (update.isOutbox) return;
  else {
	  let message = update.text;
    
    if (message === "" || !message) return;
    if (!message.startsWith(prefix) && !message.startsWith(mentionPrefix)) return;
    
    if (message.startsWith(mentionPrefix)) 
      update.state.mentioned = true
    else 
      update.state.mentioned = false
    
    await next();
  }
});
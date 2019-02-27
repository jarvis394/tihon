const { prefix } = require("../config");
const { error } = require("../utils");

module.exports = (updates, api, randomStorage) => updates.on('message', async (context, next) => {
  let text = context.text;
  let args = text.slice(prefix.length).trim().split(' ');
  let cmd = args.shift();
  
  if (context.hasForwards || context.hasAttachments()) {
    await context.loadMessagePayload();
  }
  
  try {
    let commandFile = require(`../commands/${cmd}.js`);
    commandFile.run(api, context, args, randomStorage);
  } catch (e) { 
    if (e.code === "MODULE_NOT_FOUND") return; // :)
    error(e);
    console.error(e)
  }
  
  await next();
});
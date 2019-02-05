const { prefix } = require("../config");
const { error } = require("../utils");

module.exports = (updates, api) => updates.on('message', async (context, next) => {
  let text = context.text;
  let args = text.slice(prefix.length).trim().split(' ');
  let cmd = args.shift();
  
  try {
    let commandFile = require(`../commands/${cmd}.js`);
    commandFile.run(api, context, args);
  } catch (e) { 
    if (e.code === "MODULE_NOT_FOUND") return; // :)
    error("> [ERROR]", e);
  }
  
  await next();
});
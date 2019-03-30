const { prefix } = require("../config")
const { error } = require("../utils")

module.exports = (updates, api, randomStorage, cmds, vk) => updates.on('message', async (context, next) => {
  let text, args, cmd
  
  if (context.state.mentioned) {
    text = context.text
    args = text.split(" ")
    args.shift()
    cmd = args.shift()
  } else {
    text = context.text
    args = text.slice(prefix.length).trim().split(' ')
    cmd = args.shift()
  }
  
  if (context.hasForwards || context.hasAttachments()) {
    await context.loadMessagePayload()
  }
  
  cmds.map(c => c.alias && c.alias.map(el => {
    if (el.startsWith(cmd)) return cmd = c.name
  }))
  
  try {
    let commandFile = require(`../commands/${cmd}.js`);
    commandFile.run(api, context, args, randomStorage, vk);
  } catch (e) { 
    if (e.code === "MODULE_NOT_FOUND") return;
    error(e)
  }
  
  await next()
});
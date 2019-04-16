const { prefix } = require("../config")
const { error } = require("../utils")

module.exports = (updates, api, randomStorage, cmds, vk) => updates.on("message", async (context, next) => {
  let text = context.text, args, cmd, er = 0
  
  if (context.state.mentioned) {
    text = context.text
    args = text.split(" ")
    args.shift()
  } else {
    text = context.text
    args = text.slice(prefix.length).trim().split(" ")
  }
  
  if (context.hasForwards || context.hasAttachments()) {
    await context.loadMessagePayload()
  }
  
  let cName = args.shift()
  cmds.forEach(c => {
    if (c.name === cName || (c.alias && c.alias.some(e => e.startsWith(cName)))) return cmd = c
  })
  
  if (!cmd) return
  
  try {
    let commandFile = require(`../commands/${cmd.group}/${cmd.name}.js`)
    commandFile.run(api, context, args, randomStorage, vk)
  } catch (e) { 
    if (e.code === "MODULE_NOT_FOUND") return 
    error(e)
  }
  
  await next()
})
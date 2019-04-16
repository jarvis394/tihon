const { prefix } = require("../config")
const { error } = require("../utils")

module.exports = (updates, api, randomStorage, cmds, vk) => updates.on("message", async (context, next) => {
  let text = context.text, args, cmd, er = 0
  
  if (context.state.mentioned) {
    text = context.text
    args = text.split(" ")
    args.shift()
    cmd = cmds[cmds.findIndex(el => el.name === args.shift())]
  } else {
    text = context.text
    args = text.slice(prefix.length).trim().split(" ")
    cmd = cmds[cmds.findIndex(el => el.name === args.shift())]
  }
  
  if (context.hasForwards || context.hasAttachments()) {
    await context.loadMessagePayload()
  }
  
  cmds.map(c => c.alias && c.alias.map(el => {
    if (el.startsWith(cmd)) return cmd = c
  }))
  
  try {
    let commandFile = require(`../commands/${cmd.group}/${cmd.name}.js`)
    commandFile.run(api, context, args, randomStorage, vk)
  } catch (e) { 
    if (e.code === "MODULE_NOT_FOUND") return 
    error(e)
  }
  
  await next()
})
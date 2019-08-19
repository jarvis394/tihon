exports.run = async (api, update, args) => {
  try {
    let file = args[0]
    
    if (!file) file = 'info'
    
    const module = require(`./${file}`)
    
    return module.run(api, update, args)
  } catch (e) {
    return update.reply('This command is not exists (yet)')
  }
}

exports.command = {
  // 'hidden': true
}
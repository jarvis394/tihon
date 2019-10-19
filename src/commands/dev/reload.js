exports.run = async ({ update, args }) => {
  const { commands } = require('../../globals')

  const cmdName = args[0]
  let command

  if (!cmdName) {
    throw new Error('Введи команду')
  }

  commands.forEach(c => {
    const commandFound = s => c.name === s
    const aliasFound = s => c.alias && c.alias.some(e => s.startsWith(e))

    if (commandFound(cmdName) || aliasFound(cmdName)) {
      return (command = c)
    }
  })

  if (!command) {
    throw new Error('Команда не найдена')
  }

  const { group, name } = command

  delete require.cache[require.resolve(`../../commands/${group}/${name}`)]

  return '👌'
}

exports.command = {
  hidden: true,
}

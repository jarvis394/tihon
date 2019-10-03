const fs = require('fs')
const path = require('path')
const COMMANDS_PATH = path.resolve(process.cwd(), 'src/commands')

let commands = []
fs.readdirSync(COMMANDS_PATH).forEach(group => {
  fs.readdirSync(COMMANDS_PATH + '/' + group).forEach(command => {
    let i = require('../commands/' + group + '/' + command).command

    if (i.hidden) return

    i.group = group
    i.name = command.split('.')[0]

    commands.push(i)
  })
})

module.exports = commands

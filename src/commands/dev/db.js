/* eslint-disable no-unexpected-multiline */
exports.run = async ({ update, args }) => {
  const { db } = require('../../globals')

  const res = db
    .prepare(args.slice(0, args.length - 1).join(' '))
    [args[args.length - 1]]()

  return update.reply(res)
}

exports.command = {
  hidden: true,
}

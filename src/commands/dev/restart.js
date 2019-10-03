exports.run = async ({ update, args }) => {
  await update.reply('👌')
  process.kill(process.pid)
}

exports.command = {
  hidden: true,
}

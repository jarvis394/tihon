exports.run = async ({ update, args }) => {
  process.kill(process.pid)
  return '👌'
}

exports.command = {
  hidden: true,
}

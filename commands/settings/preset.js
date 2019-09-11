exports.run = async ({ update, args }) => {
  update.send('> не готово пока')
}

exports.command = {
  name: 'preset',
  arguments: 'num|num',
  description: {
    en: 'Set roles preset',
    ru: 'Установить пресет ролей',
  },
  group: 'utils',
  hidden: true,
}

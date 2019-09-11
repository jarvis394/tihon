exports.run = async ({ update, args }) => {
  const { get } = require('request-promise-native')

  const options = {
    url: 'https://nekos.life/api/neko',
    json: true,
  }

  let data = await get(options)
  let url = data.neko

  return await update.sendPhoto(url)
}

exports.command = {
  name: 'neko',
  arguments: false,
  description: {
    en: 'Catch up neko-chan!~~',
    ru: 'Поймать кошко-дiвочку!~~',
  },
  group: 'random',
}

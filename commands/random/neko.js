const { get } = require('request-promise-native')
const { handleError } = require('../../utils')

const options = {
  url: 'https://nekos.life/api/neko',
  json: true
}

exports.run = async (api, update) => {
  try {

    let data = await get(options)
    let url = data.neko

    return await update.sendPhoto(url)

  } catch (e) {
    handleError(update, e)
  }
}

exports.command = {
  'name': 'neko',
  'arguments': false,
  'description': {
    'en': 'Catch up neko-chan!~~',
    'ru': 'Поймать кошко-дiвочку!~~'
  },
  'group': 'random'
}
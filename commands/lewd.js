const { get } = require('request-promise-native');
const { handleError } = require("../utils");

const options = {
  url: 'https://nekos.life/api/lewd/neko',
  json: true
}

exports.run = async (api, update, args) => {
  try {

    let data = await get(options);
    let url = data.neko;

    return await update.sendPhoto(url);

  } catch (e) {
    handleError(update, e)
  }
}

exports.command = {
  "name": "neko",
  "arguments": false,
  "description": {
    "en": "Eww, lewd nekos!~~",
    "ru": "Ухх, горячие кошко-дiвки!~~"
  }
}
const { randomArray } = require('../utils/random')

const answers = [
  'a?',
  'чо',
  'шо тобi',
  'что надо',
  'ну',
  'я слушаю',
  'да да я',
  'э',
  'ну cho',
  'да чё'
]

module.exports = async update => await update.send(randomArray(answers))

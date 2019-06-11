const {
  mentionPrefix
} = require('../config')
const {
  randomArray
} = require('../utils')
const {
  updates
} = require('../variables')

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

updates.on('message', async (update, next) => {
  let {
    text
  } = update

  if (text && text.split(' ').some(el => el.startsWith(mentionPrefix)) && !text.split(' ')[1]) {
    return update.send(randomArray(answers))
  }

  await next()
})
const { MENTION_PREFIX } = require('../configs/constants')
const { randomArray } = require('../utils/random')
const { updates } = require('../variables')

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
  let { text } = update

  text =
    text &&
    text
      .split(' ')
      .map(a => a.trim())
      .filter(a => a.length !== 0)

  if (text && text.some(el => el.startsWith(MENTION_PREFIX)) && !text[1]) {
    return update.send(randomArray(answers))
  }

  await next()
})

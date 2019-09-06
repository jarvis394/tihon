exports.run = async (update, args) => {
  const handleError = require('../../utils/handleError')

  const { ID } = require('../../configs/constants')

  const firebase = require('firebase-admin')
  const db = firebase.firestore()

  try {
    let msg = update.payload.reply_message

    if (!msg) {
      return update.reply('Пришли мне моё сообщение, чтобы зарепортить его.')
    } else if (msg.from_id.toString() !== ID) {
      return update.reply('Сообщение должно быть от меня')
    }

    let date = msg.date
    let res

    /*for (let el of rs.keys()) {
      if (parseInt(el) > date - 100 && parseInt(el) < date + 100) {
        res = parseInt(el)
        break
      }
    }

    let docName = `${res}`

    await db
      .collection('reported')
      .doc(docName)
      .set({
        id: rs.get(res)
      })

    return update.send(`Сообщение с ID ${res} помечено как спам.`)*/
  } catch (e) {
    handleError(update, e)
  }
}

exports.command = {
  name: 'report',
  arguments: '(fwd)|(сообщение)',
  description: {
    en: 'Report forwarded message',
    ru: 'Зарепортить пересланное сообщение'
  },
  alias: ['репорт'],
  group: 'global',
  hidden: true
}

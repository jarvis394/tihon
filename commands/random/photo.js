exports.run = async (api, update) => {
  const handleError = require('../../utils/handleError')

  const { randomArray } = require('../../utils/random')

  const DBDialog = require('../../lib/Dialog')
  const blacklist = require('../../configs/blacklist')

  return update.reply('😦 Фото пока недоступно')

  /*try {
    // Get dialogs
    var Dialogs = await api.messages.getConversations({
      count: 200
    })

    async function getMsg() {
      var Dialog = randomArray(Dialogs.items)

      const dialog = new DBDialog(Dialog.conversation.peer.id)
      const data = dialog.checkData()

      while (data.no) {
        Dialog = randomArray(Dialogs.items)
      }

      var Photos = await api.messages.getHistoryAttachments({
        peer_id: Dialog.conversation.peer.id,
        count: 200,
        media_type: 'photo'
      })

      // Return false if no photos in dialog
      if (!Photos.items) return false

      var Photo = randomArray(Photos.items)

      return Photo
    }

    let ph = await getMsg()

    while (!ph || blacklist.USERS.some(e => e === ph.attachment.photo.owner_id.toString())) {
      ph = await getMsg()
    }

    var access = ph.attachment.photo.access_key
      ? '_' + ph.attachment.photo.access_key
      : ''

    await update.send('', {
      attachment: `photo${ph.attachment.photo.owner_id}_${
        ph.attachment.photo.id
      }${access}`
    })
  } catch (e) {
    handleError(update, e)
  }*/
}

exports.command = {
  name: 'photo',
  arguments: false,
  description: {
    en: 'Sends random photo from other multidialogs',
    ru: 'Отправить рандомное фото из других бесед'
  },
  alias: ['фото', 'фотка'],
  group: 'random'
}

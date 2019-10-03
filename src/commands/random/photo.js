exports.run = async ({ update }) => {
  const { randomArray } = require('../../utils/random')
  const { api, db } = require('../../globals')
  const blacklist = require('../../configs/blacklist')

  // Get dialogs
  var Dialogs = await api.messages.getConversations({
    count: 200,
  })

  async function getMsg() {
    var Dialog = randomArray(Dialogs.items)

    const data = db
      .prepare(
        `SELECT * FROM main.dialogs WHERE id = ${Dialog.conversation.peer.id}`
      )
      .get()

    while (!data.canReadMessages) {
      Dialog = randomArray(Dialogs.items)
    }

    var Photos = await api.messages.getHistoryAttachments({
      peer_id: Dialog.conversation.peer.id,
      count: 200,
      media_type: 'photo',
    })

    // Return false if no photos in dialog
    if (!Photos.items) return false

    var Photo = randomArray(Photos.items)

    return Photo
  }

  let ph = await getMsg()

  while (
    !ph ||
    blacklist.USERS.some(e => e === ph.attachment.photo.owner_id.toString())
  ) {
    // eslint-disable-next-line require-atomic-updates
    ph = await getMsg()
  }

  var access = ph.attachment.photo.access_key
    ? '_' + ph.attachment.photo.access_key
    : ''

  await update.send('', {
    attachment: `photo${ph.attachment.photo.owner_id}_${ph.attachment.photo.id}${access}`,
  })
}

exports.command = {
  name: 'photo',
  arguments: false,
  description: {
    en: 'Sends random photo from other multidialogs',
    ru: 'Отправить рандомное фото из других бесед',
  },
  alias: ['фото', 'фотка'],
  group: 'random',
}

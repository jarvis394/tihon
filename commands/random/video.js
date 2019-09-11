exports.run = async ({ update, args }) => {
  const { randomArray } = require('../../utils/random')
  const DBDialog = require('../../lib/DBDialog')
  const { api } = require('../../variables')

  async function getMsg() {
    var Dialog = randomArray(Dialogs.items)

    const dialog = new DBDialog(Dialog.conversation.peer.id)
    const data = dialog.checkData()

    while (data.no) {
      Dialog = randomArray(Dialogs.items)
    }

    var Videos = await api.messages.getHistoryAttachments({
      peer_id: Dialog.conversation.peer.id,
      count: 200,
      media_type: 'video',
    })

    // Return false if no videos in dialog
    if (!Videos.items) return false

    var Video = randomArray(Videos.items)

    return Video
  }

  // Get dialogs
  var Dialogs = await api.messages.getConversations({
    count: 200,
  })

  let video = await getMsg()

  while (!video) {
    video = await getMsg()
  }

  video = video.attachment.video

  var access = video.access_key ? '_' + video.access_key : ''

  await update.send('', {
    attachment: `video${video.owner_id}_${video.id}${access}`,
  })
}

exports.command = {
  name: 'video',
  arguments: false,
  description: {
    en: 'Sends random video from other multidialogs',
    ru: 'Отправить рандомное видео из других бесед',
  },
  alias: ['видео'],
  group: 'random',
}

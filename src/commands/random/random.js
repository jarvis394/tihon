exports.run = async ({ update, args }) => {
  const randomMessage = require('../../utils/randomMessage')

  let res
  let options = {}
  let flag = false

  let msg = await randomMessage()

  if (msg.text !== '') res = msg.text

  if (msg.attachments.length !== 0) {
    msg.attachments.forEach(async attachment => {
      if (attachment.type === 'photo') {
        /*let access = attachment.photo.access_key
            ? '_' + attachment.photo.access_key
            : ''
          options.attachment += options.attachment
            ? `photo${attachment.photo.owner_id}_${
              attachment.photo.id
            }${access}`
            : `, photo${attachment.photo.owner_id}_${
              attachment.photo.id
            }${access}`*/
      } else if (attachment.type === 'sticker') {
        flag = true
        return await update.sendSticker(attachment.sticker.sticker_id)
      } else if (attachment.type === 'audio_message') {
        flag = true
        return await update.sendAudioMessage(attachment.audio_message.link_ogg)
      } else if (attachment.type === 'video') {
        let access = attachment.video.access_key
          ? '_' + attachment.video.access_key
          : ''
        options.attachment = options.attachment
          ? `video${attachment.video.owner_id}_${attachment.video.id}${access}`
          : `, video${attachment.video.owner_id}_${attachment.video.id}${access}`
      }
    })
  }

  // let date = await api.utils.getServerTime()

  if (!flag) await update.send(res, options)

  // rs.set(date, msg.id)
}

exports.command = {
  name: 'random',
  arguments: false,
  description: {
    en: 'Sends random message from other multidialogs',
    ru: 'Отправить рандомное сообщение из других бесед',
  },
  alias: ['рандом', 'что', 'сообщение'],
  group: 'random',
}

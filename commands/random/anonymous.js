exports.run = async (api, update, args, _1, _2, _3, variables) => {
  const {
    handleError
  } = require('../../utils')
  
  const {
    randomArray
  } = require('../../utils')
  
  const {
    anonCommandCooldown
  } = require('../../config')
  
  const moment = require('moment')
  
  try {

    const { anonCommandTimeout } = variables

    async function send(peer, text, attachments) {
      await api.messages.send({
        peer_id: peer,
        message: text,
        attachment: attachments
      })
    }

    function processAttachments(attachments, peer) {
      let response = []

      attachments.forEach(async attachment => {
        /* eslint-disable indent */
        switch (attachment.type) {
          case 'photo': {
            const {
              ownerId,
              accessKey,
              id
            } = attachment
            let access = accessKey ? '_' + accessKey : ''
            response.push(`photo${ownerId}_${id}${access}`)
            break
          }

          case 'audio_message': {
            flag = true
            await update.sendAudioMessage(attachment.oggUrl, {
              peer_id: peer
            })
            break
          }
        }
        /* eslint-enable indent */
      })

      return response
    }

    let {
      peerId,
      senderId
    } = update

    if (senderId === 119528604) return update.send('😉😊Привет Павлу Ямову!👋👋')

    const hasAttachments = update.hasAttachments()
    const hasReply = update.hasReplyMessage

    if (anonCommandTimeout.has(senderId)) {
      let time = anonCommandCooldown - Date.now() - anonCommandTimeout.get(senderId)

      return update.reply('❌ Нельзя так часто слать фигню в беседы!\n' + 
        'Осталось ждать: ' + moment(time).format('ss'))
    }

    if (args.length === 0 && !hasAttachments && !hasReply) 
      return update.send('❌ Нету текста или чего-нибудь, что можно отправить')

    if (args.join(' ').length > 1000) 
      return update.send('❌ Слишком много текста (>1000), не засоряй чужую беседу')

    const Dialogs = await api.messages.getConversations({
      count: 200
    })
    const count = Dialogs.count
    let dialogs = Dialogs.items
    let offset = 200

    while (offset < count) {
      let offsetDialogs = await api.messages.getConversations({
        count: 200,
        offset: offset
      })

      dialogs = dialogs.concat(offsetDialogs.items)

      offset += 200
    }

    let dialog = randomArray(dialogs).conversation

    while (!dialog.can_write.allowed) {
      dialog = randomArray(dialogs).conversation
    }

    const peer = dialog.peer.id

    let attachments = []
    let flag = false
    let text = args.join(' ')

    if (hasAttachments) {
      attachments = attachments.concat(processAttachments(update.attachments, peer))
    }

    if (hasReply) {
      const {
        replyMessage
      } = update
      
      if (!text) text = replyMessage.text

      attachments = attachments.concat(processAttachments(replyMessage.attachments, peer))
    }

    if (!flag) await send(peer, text, attachments.join(','))

    update.reply('✅ Сообщение отправлено в диалог #' + peer)

    anonCommandTimeout.set(senderId, Date.now())
    setTimeout(() => anonCommandTimeout.delete(senderId), anonCommandCooldown)

  } catch (e) {
    handleError(update, e)
  }
}

exports.command = {
  'arguments': '(message/attachment/forward)|(message/attachment/forward)',
  'description': {
    'en': 'Sends your message to a random multidialog',
    'ru': 'Отправляет твоё сообщение в рандомную беседу'
  },
  'alias': [
    'anon',
    'анон',
    'анонимус'
  ]
}
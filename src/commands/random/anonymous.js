exports.run = async (update, args, _1, _2, _3, globals) => {
  return update.reply(
    '🤗 Эта команда теперь недоступна, спасибо [id233169580|Артёму Булатову]!'
  )

  // DISABLED //

  //
  // const { randomArray } = require('../../utils/random')
  // const { ANON_COOLDOWN } = require('../../configs/constants')
  // const commandLogger = require('../../lib/CommandLogger')
  // const ANON_PRICE = 2500
  // const User = require('../../lib/User')
  // const moment = require('moment')

  //
  //   const { anonCommandTimeout } = globals

  //   async function send(peer, text, attachments) {
  //     await api.messages.send({
  //       peer_id: peer,
  //       message: text,
  //       attachment: attachments
  //     })
  //   }

  //   function processAttachments(attachments, peer) {
  //     let response = []

  //     attachments.forEach(async attachment => {
  //       /* eslint-disable indent */
  //       switch (attachment.type) {
  //         /*case 'photo': {
  //           const { ownerId, accessKey, id } = attachment
  //           let access = accessKey ? '_' + accessKey : ''
  //           response.push(`photo${ownerId}_${id}${access}`)
  //           break
  //         }*/

  //         case 'audio_message': {
  //           flag = true
  //           await update.sendAudioMessage(attachment.oggUrl, {
  //             peer_id: peer
  //           })
  //           break
  //         }
  //       }
  //       /* eslint-enable indent */
  //     })

  //     return response
  //   }

  //   let { peerId, senderId } = update

  //   const hasAttachments = update.hasAttachments()
  //   const hasReply = update.hasReplyMessage

  //   if (anonCommandTimeout.has(senderId)) {
  //     let time =
  //       ANON_COOLDOWN - (Date.now() - anonCommandTimeout.get(senderId))

  //     return update.reply(
  //       '❌ Нельзя так часто слать фигню в беседы!\n' +
  //         'Осталось ждать: ' +
  //         moment(time).format('mm:ss')
  //     )
  //   }

  //   if (args.length === 0 && !hasAttachments && !hasReply)
  //     return update.reply('❌ Нету текста или чего-нибудь, что можно отправить')

  //   if (args.join(' ').length > 1000) {
  //     return update.reply(
  //       '❌ Слишком много текста (>1000), не засоряй чужую беседу'
  //     )
  //   } else if (args.join(' ').length < 10) {
  //     return update.reply(
  //       '❌ Слишком мало текста (<10)'
  //     )
  //   }

  //   const user = new User(senderId)
  //   const { state, amount } = await user.isEnoughFor(ANON_PRICE)
  //   if (!state)
  //     return update.reply(
  //       `🧮 Не хватает денег: у тебя ${amount}T, а нужно ${ANON_PRICE}T`
  //     )

  //   const Dialogs = await api.messages.getConversations({
  //     count: 200
  //   })
  //   const count = Dialogs.count
  //   let dialogs = Dialogs.items
  //   let offset = 200

  //   while (offset < count) {
  //     let offsetDialogs = await api.messages.getConversations({
  //       count: 200,
  //       offset: offset
  //     })

  //     dialogs = dialogs.concat(offsetDialogs.items)

  //     offset += 200
  //   }

  //   let dialog = randomArray(dialogs).conversation

  //   while (!dialog.can_write.allowed) {
  //     dialog = randomArray(dialogs).conversation
  //   }

  //   const peer = parseInt(dialog.peer.id)
  //   const textPeer = peer - 2000000000 > 0 ? peer - 2000000000 : peer

  //   let attachments = []
  //   let flag = false
  //   let text = args.join(' ')

  //   if (hasAttachments) {
  //     attachments = attachments.concat(
  //       processAttachments(update.attachments, peer)
  //     )
  //   }

  //   if (hasReply) {
  //     const { replyMessage } = update

  //     if (!text) text = replyMessage.text

  //     attachments = attachments.concat(
  //       processAttachments(replyMessage.attachments, peer)
  //     )
  //   }

  //   if (!flag) await send(peer, text, attachments.join(','))

  //   user.subtract(ANON_PRICE)
  //   update.reply('✅ Сообщение отправлено в диалог #' + textPeer)

  //   // Log message to command.log
  //   commandLogger.anon({
  //     text,
  //     attachments: attachments.join(','),
  //     toPeer: peer,
  //     senderId,
  //     peerId
  //   })

  //   anonCommandTimeout.set(senderId, Date.now())
  //   setTimeout(() => anonCommandTimeout.delete(senderId), ANON_COOLDOWN)
  // } catch (e) {
  //   handleError(update, e)
  // }
}

exports.command = {
  arguments: '(message/attachment/forward)|(message/attachment/forward)',
  description: {
    en: 'Sends your message to a random multidialog',
    ru: 'Отправляет твоё сообщение в рандомную беседу',
  },
  alias: ['anon', 'анон', 'анонимус'],
  hidden: true,
}

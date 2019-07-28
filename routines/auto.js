const DBDialog = require('../lib/Dialog')
const { random } = require('../utils/random')
const randomMessage = require('../utils/randomMessage')
const { AUTO_INTERVAL } = require('../configs/constants')
const { log, api, vk } = require('../variables')

setInterval(async () => {
  const Dialogs = await api.messages.getConversations({ count: 200 })
  const count = Dialogs.count
  let dialogs = Dialogs.items
  let offset = 200

  while (offset < count) {
    const offsetDialogs = await api.messages.getConversations({
      count: 200,
      offset: offset
    })
    offsetDialogs.items.forEach(d => dialogs.push(d))

    offset += 200
  }

  dialogs.forEach(async dialog => await messageService(dialog))
}, AUTO_INTERVAL)

/**
 * Installs service for a dialog to auto send messages
 * @param {Object} dialog Dialog object
 */
async function messageService(dialog) {
  const Dialog = new DBDialog(dialog.conversation.peer.id)
  const data = await Dialog.checkData()

  // If dialog is blacklisted then return
  if (!data.auto) return

  // If bot was kicked from dialog then return
  if (!dialog.conversation.can_write.allowed) return

  setTimeout(async () => {
    let res = ''
    let options = {}

    let msg = await randomMessage(api)

    if (msg.text !== '') {
      res = msg.text
    }

    if (msg.attachments.length !== 0) {
      msg.attachments.forEach(attachment => {
        let { type } = attachment
        let { owner_id, id } = attachment[type]
        let access = attachment[type].access_key
          ? '_' + attachment[type].access_key
          : ''

        options.attachments += options.attachments ? ', ' : ''
        options.attachments += type + owner_id + '_' + id + access
      })
    }

    // If some attachments
    if (options.attachments) {
      try {
        return vk.api.messages.send({
          message: res,
          attachment: options.attachments,
          peer_id: dialog.conversation.peer.id
        })
      } catch (e) {
        log.error(e)
      }
    }

    // If no attachment and there is a texf
    else if (res !== '') {
      try {
        return vk.api.messages.send({
          message: res,
          peer_id: dialog.conversation.peer.id
        })
      } catch (e) {
        log.error(e)
      }
    }

    // Throw this message away in any other case
    else return
  }, random(0, 60) * 1000)
}

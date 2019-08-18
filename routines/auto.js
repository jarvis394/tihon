const DBDialog = require('../lib/Dialog')
const { random } = require('../utils/random')
const { randomMessage, data } = require('../utils')
const { AUTO_INTERVAL } = require('../configs/constants')
const { log, api, collect } = require('../variables')

let queue = []

setInterval(async () => {
  log.info('Sending random messages')

  queue = []

  const dialogs = (await data.getDialogs()).slice(0, 250)

  dialogs.forEach(async dialog => await messageService(dialog))
}, AUTO_INTERVAL)

/**
 * Installs service for a dialog to auto send messages
 * @param {Object} dialog Dialog object
 */
async function messageService(dialog) {
  const Dialog = new DBDialog(dialog.conversation.peer.id)
  const data = await Dialog.checkData()
  let options = {
    peer_id: dialog.conversation.peer.id,
    random_id: random(10000000, 99999999)
  }

  // If dialog is blacklisted then return
  if (!data.auto) return

  // If bot was kicked from dialog then return
  if (!dialog.conversation.can_write.allowed) return

  // Get random message
  const msg = await randomMessage(api)

  // Check for text
  if (msg.text !== '') {
    options.message = msg.text
  }

  // Check for attachments
  if (msg.attachments.length !== 0) {
    msg.attachments.forEach(attachment => {
      let { type } = attachment
      let { owner_id, id } = attachment[type]
      let access = attachment[type].access_key
        ? '_' + attachment[type].access_key
        : ''

      options.attachment += options.attachment ? ', ' : ''
      options.attachment += type + owner_id + '_' + id + access
    })
  }

  if (!options.message && !options.attachment) return

  queue.push(options)
  
  if (queue.length >= 25) {
    setTimeout(
      async () => await collect.executes('messages.send', queue),
      random(5 * 1000, 60 * 1000)
    )

    queue = []
  }
}

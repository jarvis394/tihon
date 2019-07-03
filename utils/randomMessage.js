const { api, firebase } = require('../variables')
const { ID } = require('../configs/constants')
const Dialog = require('../lib/Dialog')
const { randomArray } = require('./random')
const db = firebase.firestore()

/**
 * Returns random message from multidialogs
 *
 * @returns {object} Message object
 */
module.exports = async () => {
  // Testing functions
  const isEmpty = m => m.attachments.length === 0 && (m.text === '' || !m.text)
  const startsWithLink = m => m.text.split(' ').some(t => t.startsWith('http'))
  const startsWithPhone = m => m.text.split(' ').some(t => t.startsWith('+7'))
  const isCommandMessage = m => m.text.split(' ').some(t => t.startsWith('/'))
  const isErrorMessage = m =>
    m.text.split(' ').some(t => t.startsWith('АШИБКА РИП'))
  const isLong = m => m.text.length > 200
  const isSelf = m => m.from_id.toString() === ID.toString()
  const hasMention = m => m.text.split(' ').some(t => t.startsWith('[id'))

  function testMessage(m) {
    if (!m) return true

    return (
      isEmpty(m) ||
      startsWithLink(m) ||
      startsWithPhone(m) ||
      isCommandMessage(m) ||
      isErrorMessage(m) ||
      isLong(m) ||
      isSelf(m) ||
      hasMention(m) ||
      flag
    )
  }

  // Get dialogs
  let dialogs = await api.messages.getConversations({
    count: 200
  })

  async function getMsg() {
    let dialog = randomArray(dialogs.items)

    const dialogData = new Dialog(dialog.conversation.peer.id)
    const data = dialogData.checkData()

    while (data.no) {
      dialog = randomArray(dialogs.items)
    }

    let messages = await api.messages.getHistory({
      peer_id: dialog.conversation.peer.id
    })
    let message = randomArray(messages.items)

    return message
  }

  let msg = await getMsg()
  let isReported = await db
    .collection('reported')
    .where('id', '==', parseInt(msg.id))
    .get()
  let flag = 0

  isReported.forEach(() => {
    flag = true
  })

  while (testMessage(msg)) {
    msg = await getMsg()

    isReported = await db
      .collection('reported')
      .where('id', '==', parseInt(msg.id))
      .get()
    flag = 0

    isReported.forEach(() => {
      flag = true
    })
  }

  return msg
}

const blacklist = require('../configs/blacklist')
const { ID } = require('../configs/constants')
const commandLogger = require('../lib/structures/CommandLogger')
const { randomArray } = require('./random')
const isUrl = require('./isUrl')
const dataUtils = require('./data')
const { db } = require('../globals')

/**
 * Returns random message from multidialogs
 *
 * @returns {object} Message object
 */
module.exports = async () => {
  // Testing functions
  const isEmpty = m => !m.text
  const hasLink = m => m.text.split(' ').some(t => isUrl(t))
  const startsWithPhone = m => m.text.split(' ').some(t => t.startsWith('+7'))
  const isCommandMessage = m => m.text.split(' ').some(t => t.startsWith('/'))
  const isErrorMessage = m =>
    m.text.split(' ').some(t => t.startsWith('АШИБКА РИП'))
  const isLong = m => m.text.length > 200
  const isSelf = m => m.from_id.toString() === ID.toString()
  const hasMention = m =>
    m.text.split(' ').some(t => t.startsWith('[id') || t.startsWith('[club'))
  const isFromGroup = m => m.from_id < 0

  function testMessage(m) {
    if (!m) return true

    return (
      isEmpty(m) ||
      hasLink(m) ||
      startsWithPhone(m) ||
      isCommandMessage(m) ||
      isErrorMessage(m) ||
      isLong(m) ||
      isSelf(m) ||
      hasMention(m) ||
      isFromGroup(m)
    )
  }

  function testAttachments(m) {
    let flag = false

    m.attachments.forEach(a => {
      if (blacklist.USERS.includes(e => e === a[a.type].owner_id.toString())) {
        flag = true
      }
    })

    return flag
  }

  function canRead(m) {
    const data = db
      .prepare(`SELECT * FROM main.dialogs WHERE id = ${m.peer_id}`)
      .get()

    if (data) {
      return data.canReadMessages === 'true'
    }
  }

  async function getMsg() {
    const histories = dataUtils.getHistories()
    const dialogHistory = randomArray(histories)
    const message = randomArray(dialogHistory.items)

    return message
  }

  let msg = await getMsg()

  while (testMessage(msg) || testAttachments(msg) /* || !canRead(msg)*/) {
    msg = await getMsg()
  }

  // Log message to command.log
  commandLogger.random({
    message: msg,
  })

  return msg
}

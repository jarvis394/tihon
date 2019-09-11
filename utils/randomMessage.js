const blacklist = require('../configs/blacklist')
const { ID } = require('../configs/constants')
const commandLogger = require('../lib/CommandLogger')
const { randomArray } = require('./random')
const isUrl = require('./isUrl')
const dataUtils = require('./data')

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
  const hasMention = m => m.text.split(' ').some(t => t.startsWith('[id'))

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
      hasMention(m)
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

  async function getMsg() {
    const histories = dataUtils.getHistories()
    const dialogHistory = randomArray(histories)
    const message = randomArray(dialogHistory.items)

    return message
  }

  let msg = await getMsg()

  while (testMessage(msg) || testAttachments(msg)) {
    msg = await getMsg()
  }

  // Log message to command.log
  commandLogger.random({
    message: msg,
  })

  return msg
}

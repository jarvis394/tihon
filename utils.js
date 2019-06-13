const DBDialog = require('./lib/DBDialog')
const log = require('loglevel')

const { firebase } = require('./variables')
const db = firebase.firestore()

/**
 * Returns random item from array
 * 
 * @param {array} array Array
 * @returns {any} Item from array
 */
const randomArray = (array) => {
  return array[Math.floor(Math.random() * array.length)]
}

/**
 * Returns random value between min and max
 * 
 * @param {value} min Minimum
 * @param {value} max Maximum
 * @returns {value} Random value
 */
const random = (min, max) => {
  var rand = min - 0.5 + Math.random() * (max - min + 1)
  rand = Math.round(rand)
  return rand
}

/**
 * Returns random message from multidialogs
 * 
 * @param {object} api Api object
 * @returns {object} Message object
 */
const randomMessage = async (api) => {
  
  // Testing functions //
  const isEmpty = (m) => m.attachments.length === 0 && (m.text === '' || !m.text)
  const startsWithLink = (m) => m.text.split(' ').some(t => t.startsWith('http'))
  const startsWithPhone = (m) => m.text.split(' ').some(t => t.startsWith('+7'))
  const isCommandMessage = (m) => m.text.split(' ').some(t => t.startsWith('/'))
  const isErrorMessage = (m) => m.text.split(' ').some(t => t.startsWith('АШИБКА РИП'))
  const isLong = (m) => m.text.length > 200
  const isSelf = (m) => m.from_id.toString() === process.env.ID.toString()
  
  function testMessage(m) {
    return isEmpty(m) || 
      startsWithLink(m) || 
      startsWithPhone(m) || 
      isCommandMessage(m) || 
      isErrorMessage(m) || 
      isLong(m) || 
      isSelf(m) || 
      flag
  }
  
  // Get dialogs
  let Dialogs = await api.messages.getConversations({
    count: 200
  })

  async function getMsg() {
    let Dialog = randomArray(Dialogs.items)

    const dialog = new DBDialog(Dialog.conversation.peer.id)
    const data = dialog.checkData()

    while (data.no) {
      Dialog = randomArray(Dialogs.items)
    }

    let Messages = await api.messages.getHistory({
      peer_id: Dialog.conversation.peer.id
    })
    let Message = randomArray(Messages.items)

    return Message
  }

  let msg = await getMsg()
  let isReported = await db.collection('reported').where('id', '==', parseInt(msg.id)).get()
  let flag = 0

  isReported.forEach(() => {
    flag = true
  })

  while (testMessage(msg)) {
    msg = await getMsg()

    isReported = await db.collection('reported').where('id', '==', parseInt(msg.id)).get()
    flag = 0

    isReported.forEach(() => {
      flag = true
    })
  }

  return msg
}

/*
const log = (msg, peer) => {
  // eslint-ignore-no-console
  console.log(`> [LOG] ${msg} ${peer ? '| ' + peer : ''}`)
}

const error = (msg, path, e) => {
  console.error(`> [ERR] ${path ? `In ${path}: ` : ''}${msg}`)
  console.log(e)
}

const captcha = (msg) => {
  console.warn(msg)
}
*/

/**
 * Handles error
 * @param {object} update Update object
 * @param {object} e Error object
 */
const handleError = (update, e) => {
  log.trace(e)
  
  process.env.MODE === 'PRODUCTION' && update.send('АШИБКА РИП. \n❌ ' + e.stack.split(' ')[0] + ' ' + e.message)
}

module.exports = {
  randomArray,
  random,
  randomMessage,
  handleError,
  /*log,
  error,
  captcha*/
}
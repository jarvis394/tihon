const { log } = require('../variables')

module.exports = async update => {
  const { peerId, text, senderId, id } = update

  // Log message
  log.log({
    level: 'command',
    message: update.isMentioned
      ? '@tihon' + text.slice(text.split(' ')[0].length)
      : text,
    command: true,
    peerId,
    senderId,
    id
  })
  console.log('\tPeer:', peerId, '| User:', senderId, '| Message:', id)
}

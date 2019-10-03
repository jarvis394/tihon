exports.run = async ({ update, args }) => {
  const { log } = require('../../globals')
  const ID = 555444315
  const msg = update.payload.fwd_messages

  if (!msg) {
    return await update.reply(
      '😯 Перешли мне сообщения, которые считаешь багнутыми, чтобы отправить их разработчикам.'
    )
  }

  try {
    await update.send(
      `🔻 Репорт от ${update.senderId}, чат ${update.chatId}:`,
      {
        peer_id: ID,
        forward_messages: msg.map(e => e.id).join(),
      }
    )
  } catch (e) {
    log.error(e)
    return await update.reply(
      '🔻 Не удалось отправить сообщение:\n' + e.message
    )
  }

  return await update.reply('😘 Спасибо за поддержку!')
}

exports.command = {
  name: 'report',
  arguments: '(fwd)|(сообщение)',
  description: {
    en: 'Report forwarded message',
    ru: 'Зарепортить пересланное сообщение',
  },
  alias: ['репорт'],
  group: 'global',
}

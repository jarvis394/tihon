exports.run = async ({ update, args }) => {
  const { api } = require('../../variables')

  const members = await api.messages.getConversationMembers({
    peer_id: update.peerId,
  })

  if (!members.items.find(e => e.member_id === update.senderId).is_admin)
    return update.reply('🤗 Такое доступно только админам!')

  const text =
    members.profiles.map(e => `[id${e.id}|.]`).join(' ') +
    '\n\n' +
    args.join(' ')

  return await update.send(text)
}

exports.command = {
  arguments: '(text)|(текст)',
  description: {
    en: 'Says yoyur message to everyone with mention',
    ru: 'Обращается ко всем участникам беседы с твоим сообщением',
  },
  alias: ['все', 'всем', '@everyone'],
  group: 'utils',
}

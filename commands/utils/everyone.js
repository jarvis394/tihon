exports.run = async (_, update, args) => {
  const handleError = require('../../utils/handleError')
  const { api } = require('../../variables')
  
  try {
    const members = await api.messages.getConversationMembers({
      peer_id: update.peerId
    })
    
    if (!members.items.find(e => e.member_id === update.senderId).is_admin) return update.reply('🤗 Такое доступно только админам!')
    
    const text = members.profiles.map(e => `[id${e.id}|${e.first_name}]`).join(' ') + '\n\n' + args.join(' ')
    
    return await update.send(text)
  } catch (e) {
    handleError(update, e)
  }
}

exports.command = {
  arguments: '(text)|(текст)',
  description: {
    en: 'Says yoyur message to everyone with mention',
    ru: 'Обращается ко всем участникам беседы с твоим сообщением'
  },
  alias: ['все', 'всем', '@everyone'],
  group: 'utils'
}

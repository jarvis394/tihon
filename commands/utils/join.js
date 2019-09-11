exports.run = ({ update, args }) => {
  const { api } = require('../../variables')

  if (args.length === 0) return update.send('Ссылки нема')

  api.messages.joinChatByInviteLink({
    link: args.join(''),
  })
}

exports.command = {
  name: 'join',
  arguments: '(link)|(ссылка)',
  description: {
    en: 'Join to multidialog by an invite link',
    ru: 'Войти в беседу по приглашению',
  },
  alias: ['войти'],
  group: 'utils',
}

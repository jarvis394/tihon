exports.run = (api, update, args) => {
  const { handleError } = require('../../utils')

  try {
    if (args.length === 0) return update.send('Ссылки нема')

    api.messages.joinChatByInviteLink({
      link: args.join('')
    })
  } catch (e) {
    handleError(update, e)
  }
}

exports.command = {
  name: 'join',
  arguments: '(link)|(ссылка)',
  description: {
    en: 'Join to multidialog by an invite link',
    ru: 'Войти в беседу по приглашению'
  },
  alias: ['войти'],
  group: 'utils'
}

exports.run = async ({ update, args }) => {
  const { random } = require('../../utils/random')
  const { api } = require('../../globals')

  if (random(0, 6) === 6) {
    api.messages
      .removeChatUser({
        chat_id: parseInt(update.peerId) - 2000000000,
        member_id: update.fromId,
      })
      .catch(e => {
        if (e.code == 15)
          return update.send(
            'У тебя больше прав, чем у меня, но знай, что у тебя сегодня удача на нуле!'
          )
        return update.send(
          'Не могу тебя забанить, но знай, что у тебя сегодня удача на нуле!'
        )
      })

    return update.reply('Упс! Тебе выпала 6-ка!')
  } else {
    return update.reply('Ну, дружок, тебе повезло! Попробуешь ещё?')
  }
}

exports.command = {
  name: 'roulette',
  arguments: false,
  description: {
    en: 'Play russian roulette',
    ru: 'Сыграть в русскую рулетку',
  },
  group: 'random',
}

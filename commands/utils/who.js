exports.run = async ({ update, args, mentionCmdState: state }) => {
  const { api } = require('../../variables')
  const replies = ['Я думаю, что', 'Мб', 'Наверное', 'Возможно', 'Реально,']
  const { randomArray } = require('../../utils/random')

  let person = await api.messages.getConversationMembers({
    peer_id: update.peerId,
    fields: 'first_name, last_name',
  })

  if (state) args.shift()

  person = randomArray(person.profiles)
  const name = state
    ? `[id${person.id}|${person.first_name + ' ' + person.last_name}]`
    : `${person.first_name + ' ' + person.last_name}`

  await update.send(
    `${randomArray(replies)}${
      args.length !== 0 ? ' ' + args.join(' ') : ''
    } это ${name}`
  )
}

exports.command = {
  name: 'who',
  arguments: '(arg)|(предл.)',
  description: {
    en: 'Who is ***?',
    ru: 'Кто ***?',
  },
  alias: ['кто', 'назови'],
  group: 'utils',
}

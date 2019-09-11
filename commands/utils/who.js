exports.run = async ({ update, args }) => {
  const { api } = require('../../variables')
  const replies = ['Я думаю, что', 'Мб', 'Хз, но', 'Наверное']
  const { randomArray } = require('../../utils/random')

  let person = await api.messages.getConversationMembers({
    peer_id: update.peerId,
    fields: 'first_name, last_name',
  })
  let state = false

  if (
    args[0].split('_')[0] === '!&9Mention' &&
    args[0].split('_')[1] === process.env.SECRET
  ) {
    state = true
    args.shift()
  }

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

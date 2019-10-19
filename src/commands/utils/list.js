exports.run = async ({ update, args, mentionCmdState: state }) => {
  const { randomArray } = require('../../utils/random')
  const { api } = require('../../globals')

  const users = await api.messages.getConversationMembers({
    peer_id: update.peerId,
    fields: 'first_name, last_name',
  })
  let list = []
  let history = []

  if (state) args.shift()

  for (
    let i = 0;
    i < (users.profiles.length >= 10 ? 10 : users.profiles.length);
    i++
  ) {
    let person = randomArray(users.profiles)
    while (history.some(e => e === person.id)) {
      person = randomArray(users.profiles)
    }

    history.push(person.id)

    if (state) {
      list.push(
        `${i + 1}. [id${person.id}|${person.first_name +
          ' ' +
          person.last_name}]`
      )
    } else {
      list.push(`${i + 1}. ${person.first_name + ' ' + person.last_name}`)
    }
  }

  return `🔹 Топ ${args.length !== 0 ? args.join(' ') : 'села'}:\n${list.join(
    '\n'
  )}`
}

exports.command = {
  name: 'list',
  arguments: '(arg)|(предл.)',
  description: {
    en: 'List of ***',
    ru: 'Список ***',
  },
  alias: ['список'],
  group: 'utils',
}

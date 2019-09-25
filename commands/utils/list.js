exports.run = async ({ update, args, mentionCmdState: state }) => {
  const { randomArray } = require('../../utils/random')
  const { api } = require('../../variables')

  let persons = await api.messages.getConversationMembers({
    peer_id: update.peerId,
    fields: 'first_name, last_name',
  })
  let list = []
  let history = []

  if (state) args.shift()

  for (
    let i = 0;
    i < (persons.profiles.length >= 10 ? 10 : persons.profiles.length);
    i++
  ) {
    let person = randomArray(persons.profiles)
    while (history.some(e => e === person.id)) {
      person = randomArray(persons.profiles)
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

  await update.send(
    `🔹 Топ ${args.length !== 0 ? args.join(' ') : 'села'}:\n${list.join('\n')}`
  )
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

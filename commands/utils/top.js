exports.run = async (api, update, args, _1, _2, _3, _4, state) => {
  const handleError = require('../../utils/handleError')

  const { randomArray } = require('../../utils/random')

  try {
    let persons = await api.messages.getConversationMembers({
      peer_id: update.peerId,
      fields: 'first_name, last_name'
    })
    let list = []
    
    if (state) args.shift()

    for (let i = 0; i < 10; i++) {
      let person = randomArray(persons.profiles)
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
  } catch (e) {
    handleError(update, e)
  }
}

exports.command = {
  name: 'top',
  arguments: '(arg)|(предл.)',
  description: {
    en: 'Top of ***',
    ru: 'Топ ***'
  },
  alias: ['топ', 'все'],
  group: 'utils'
}

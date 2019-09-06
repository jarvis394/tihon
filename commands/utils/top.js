exports.run = async (update, args) => {
  const handleError = require('../../utils/handleError')
  const { randomArray } = require('../../utils/random')
  const { api } = require('../../variables')
  
  try {
    let persons = await api.messages.getConversationMembers({
      peer_id: update.peerId,
      fields: 'first_name, last_name'
    })
    let list = []
    let state = false
    
    if (args[0].split('_')[0] === '!&9Mention' && 
        args[0].split('_')[1] === process.env.SECRET) {
      state = true
      args.shift()
    }

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
  alias: ['топ'],
  group: 'utils'
}

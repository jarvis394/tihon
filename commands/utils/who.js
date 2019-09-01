exports.run = async (api, update, args, _1, _2, _3, _4, state) => {
  const handleError = require('../../utils/handleError')

  const replies = ['Я думаю, что', 'Мб', 'Хз, но', 'Наверное']
  const { randomArray } = require('../../utils/random')

  try {
    let person = await api.messages.getConversationMembers({
      peer_id: update.peerId,
      fields: 'first_name, last_name'
    })

    person = randomArray(person.profiles)
    const name = state ? 
      `[id${person.id}|${person.first_name + ' ' + person.last_name}]` : 
      `${person.first_name + ' ' + person.last_name}`
    
    if (state) args.shift()

    await update.send(
      `${randomArray(replies)}${
        args.length !== 0 ? ' ' + args.join(' ') : ''
      } это ${name}`
    )
  } catch (e) {
    handleError(update, e)
  }
}

exports.command = {
  name: 'who',
  arguments: '(arg)|(предл.)',
  description: {
    en: 'Who is ***?',
    ru: 'Кто ***?'
  },
  alias: ['кто', 'назови'],
  group: 'utils'
}

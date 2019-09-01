exports.run = async (api, update, args) => {
  const handleError = require('../../utils/handleError')
  const User = require('../../lib/User')

  try {
    const { senderId } = update 
    const user = new User(senderId)

    // Check if someone is mentioned
    if (!args[0] || !args[0].startsWith('[id')) return update.reply('✖ Упомяни человека')

    // Get id of mentioned user
    const personId = args[0].slice(3).split('|')[0]

    // Check ids
    if (personId === user.id) return update.reply('✖ Нельзя пожениться с самим собой! Фу нахуй!')

    // Initialize person
    const person = new User(personId)

    // Execute process
    const state = await user.marryWith(person)

    // Check if entry is already created
    if (state.exists) return update.reply('🤔 Ты уже женат с этим человеком, забыл?')

    // Get names
    const names = await api.users.get({ user_ids: `${user.id},${person.id}` })
    const userName = names[0].first_name
    const personName = names[1].first_name

    // Send reply back
    return update.reply(`💕 [id${senderId}|${userName}] и [id${person.id}|${personName}] теперь женаты!`)
  } catch (e) {
    handleError(update, e)
  }
}

exports.command = {
  name: 'marry',
  arguments: false,
  description: {
    en: 'Marry with someone',
    ru: 'Пожениться с человеком'
  },
  group: 'roleplay',
  alias: [
    'брак',
    'женитьба',
    'пожениться'
  ]
}

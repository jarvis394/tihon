exports.run = async (api, update, args) => {
  const rel = '../../../'
  const handleError = require(rel + 'utils/handleError')
  const User = require(rel + 'lib/User')
  const { firebase } = require(rel + 'variables')
  const db = firebase.firestore()
  
  try {
    
    const { senderId } = update
    const user = new User(senderId)
    const guildId = await user.fetchGuild()
    
    // Return if guild is empty
    if (!guildId) return update.reply('😕 Ты не состоишь в колхозе\n\nГлава колхоза может пригласить тебя командой /колхоз пригласить [id]')
    
    // Get info
    let data = {}
    await db
      .collection('guilds')
      .doc(guildId)
      .get()
      .then(d => (data = d.data()))
    
    let members = data.members.sort((a, b) => a.role < b.role)
    const membersData = await api.users.get({ user_ids: members.map(e => e.id)})
    members.forEach((e, i) => {
      const u = membersData.find(d => d.id === e.id)
      const name = u.first_name + u.last_name
      let role = e.role
      
      if (role == 0) return ''
      if (role == 1) role = ''
      if (role == 2) role = '⚙️'
      if (role == 3) role = '👑'
      
      members[i] = `${i + 1}. ${role} [id${e.id}|${name}]`
    })
    
    const text = `📜 Состав участников колхоза "${data.name}":\n\n` + members.join('\n')
    
    return update.reply(text)
    
  } catch (e) {
    handleError(update, e)
  }
}

exports.command = {
  'hidden': true
}
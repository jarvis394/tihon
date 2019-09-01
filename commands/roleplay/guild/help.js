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
    
    const text = `${guildId ? `🔻 Ты состоишь в колхозе [ ${guildId} ]` : '🔻 Ты не состоишь в колхозе'}\n\nСправка:\n` +
          '1️⃣ /колхоз - информация о колхозе\n' +
          '2️⃣ /колхоз создать (имя) - создать колхоз\n' +
          '3️⃣ /колхоз помощь - это меню\n' +
          '4️⃣ /колхоз пригласить (id) - пригласить человека в колхоз\n' +
          '5️⃣ /колхоз принять (id колхоза) - принять приглашение\n' +
          '6️⃣ /колхоз казна (сумма) - положить деньги в казну\n' +
          '7️⃣ /колхоз битва - побоище с другим колхозом\n' +
          '8️⃣ /колхоз магазин - магазин для колхоза\n' +
          '9️⃣ /колхоз купить (n) - купить что-либо из магазина\n' +
          '🔟 /колхоз распустить - распустить колхоз\n' +
          '1️⃣1️⃣ /колхоз состав - список участников колхоза\n' +
          '1️⃣2️⃣ /колхоз выдать (id) - выдать админку человеку в колхозе\n' +
          '1️⃣3️⃣ /колхоз снять (id) - снять админку с человека в колхозе\n' +
          '1️⃣4️⃣ /колхоз топ - топ колхозов\n' +
          '1️⃣5️⃣ /колхоз выгнать (id) - выгнать человека из колхоза \n' +
          '1️⃣6️⃣ /колхоз выйти - уйти из колхоза (все роли удаляются!)\n\n' + 
          'Админы могут покупать вещи, приглашать и выгонять людей и устраивать побоища.'
    
    return update.reply(text)
    
  } catch (e) {
    handleError(update, e)
  }
}

exports.command = {
  'hidden': true
}
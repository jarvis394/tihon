module.exports = async () => {
  const Guild = require('../lib/Guild')
  const { firebase } = require('../variables')
  const db = firebase.firestore()
  const ref = db.collection('guilds')
  let result = []
  let s
  let docs = []
  
  await ref
    .orderBy('reputation', 'desc')
    .get()
    .limit(5)
    .then(snapshot => (s = snapshot))
  
  s.forEach(doc => docs.push(doc))
  
  for (let doc of docs) {
    const guild = new Guild(doc.id)
    const data = {
      rank: await guild.getReputation(),
      balance: await guild.getMoney()
    }
    
    result.push({ id: doc.id, data: data })
  }
  
  return result
}

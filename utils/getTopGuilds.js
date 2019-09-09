module.exports = async () => {
  const Guild = require('../lib/User')
  const { firebase } = require('../variables')
  const db = firebase.firestore()
  const ref = db.collection('coins')
  let result = []
  let s
  let docs = []
  
  await ref
    // .where('reputation', '>', 0)
    .orderBy('rank', 'desc')
    .limit(5)
    .get()
    .then(snapshot => (s = snapshot))
  
  s.forEach(doc => docs.push(doc))
  
  for (let doc of docs) {
    const guild = new Guild(doc.id)
    const data = {
      rank: await guild.getReputation(),
      balance: await guild.getAmount()
    }
    
    result.push({ id: doc.id, data: data })
  }
  
  return result
}

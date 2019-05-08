/* eslint-disable no-unused-vars */

const { handleError } = require("../../utils")
const data = require("../../shopData")
const coins = require("../../lib/Coins")

const aliases = {
  buy: [ "buy", "купить", "купитт", "купля", "куплч" ],
  sell: [ "sell", "продать", "продат", "продатб", "продажа" ]
}

let categories = {}
let paths = {}
for (let c in data) {
  const n = data[c]
  
  for (let i = 0; i < n.items.length; i++) {
    let g = n.items[i]
    categories[g.name.toLowerCase()] = { items: g.items, path: c, index: i }
  }
}

exports.run = async (api, update, args) => {
  try {
    
    if (!args[0]) return sendMenu()
    
    let option = args[0].toLowerCase()
    
    if (categories[option]) return sendCategory(option)
    if (aliases.buy.includes(option)) return sendBuyMenu()
    if (aliases.sell.includes(option)) return sendSellMenu()
    
    return update.send("🧐 Опция не найдена")
    
    async function sendMenu() {
      let name = await api.users.get({
        user_ids: update.senderId
      })
      
      let res = [ name[0].first_name + ", разделы магазина:", "" ]
      
      for (let group in data) {
        res.push(data[group].icon + " " + data[group].name + ":")
        
        for (let item of data[group].items) {
          res.push("⠀⠀" + item.icon + " " + item.name)
        }
        
        res.push("")
      }
      
      return update.send(res.join("\n"))
    }
    
    async function sendCategory(category) {
      let name = await api.users.get({
        user_ids: update.senderId
      })
      
      let res = [ name[0].first_name + ", раздел '" + category + "':", "" ]
      
      category = categories[category].items
      
      for (let i = 0; i < category.length; i++) {
        res.push((i + 1) + ") " + category[i].icon + " " + category[i].name + " - " + category[i].price + "T")
      }
      
      res.push("")
      res.push("Чтобы купить, напишите 'купить', раздел и номер:")
      res.push("/shop buy одежда 3")
      
      return update.send(res.join("\n"))
    }
    
    async function sendBuyMenu() {
      let name = await api.users.get({
        user_ids: update.senderId,
        name_case: "gen"
      })
      
      let user = await coins.data(update.senderId)
      
      console.log("func", user)
      
      if (!user.items) {
        user.items = []
        coins.setData(update.senderId, user)
      }
      
      console.log("2 func", user)
      
      let category = categories[args[1]].path
      let cIndex = categories[args[1]].index
      let item = parseInt(args[2])
      
      if (!category) return update.send("😖 Ты не ввел нормально категорию")
      if (category && !item) return update.send("😕 Ты не ввел нормально предмет, который хочешь купить")
      // console.log(categories)
      
      let i = data[category].items[cIndex].items[item - 1]
      
      user.items.push(i)
      
      await coins.setData(update.senderId, user)
      
      return update.send(`🎉 Теперь у ${name[0].first_name} есть предмет ${i.name}`) 
    }
    
    function sendSellMenu() {}
    
  } catch (e) {
    handleError(update, e)
  }
}

exports.command = {
  "name": "shop",
  "arguments": false,
  "description": {
    "en": "Go to the supermarket :p",
    "ru": "Сходить в супермаркет :p"
  },
  alias: [
    "шоп",
    "магазин",
    "ларёк",
    "ларек"
  ],
  "group": "shop"
}

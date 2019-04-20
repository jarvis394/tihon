const { handleError } = require("../../utils")

const aliases = {
  buy: [ "buy", "купить", "купитт", "купля", "куплч" ],
  sell: [ "sell", "продать", "продат", "продатб", "продажа" ]
}

exports.run = async (api, update, args) => {
  try {
    
    let option = args[0]
    
    if (!option) return sendMenu()
    if (option in aliases.buy) return sendBuyMenu()
    if (option in aliases.sell) return sendSellMenu()
    
    return update.send("🧐 Опция не найдена")
    
    function sendMenu() {
      let res = []
      
      return update.send(res)
    }
    
    function sendBuyMenu() {}
    
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
    "магазин"
  ],
  "group": "shop"
}

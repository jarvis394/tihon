/* eslint-diasble */

const User = require('../../lib/User')
const { handleError } = require('../../utils')
const shopData = require('../../shopData')

const aliases = {
  buy: ['buy', 'купить', 'купитт', 'купля', 'куплч'],
  sell: ['sell', 'продать', 'продат', 'продатб', 'продажа']
}

exports.run = async (api, update, args) => {
  try {
    
    let option = args[0]
    if (!option) return sendPetsMenu()
    if (aliases.buy.includes(e => e == option)) return sendBuyMenu(option)
    if (aliases.sell.includes(e => e == option)) return sendSellMenu(option)
    
    return update.send('🤔 Такой опции нет')
    
    async function sendPetsMenu() {
      let { senderId: id } = update
      let user = new User(id)
      await user.init()
      
      let pets = user.data.pets
      let res = [ '' ]
      
    }
    
    async function sendBuyMenu() {
      let name = await api.users.get({
        user_ids: update.senderId,
        name_case: 'gen'
      })
      let user = new User(update.senderId)

      if (!args[1]) {
        return update.send(
          '😕 Ты не ввел ID предмета, который хочешь купить'
        )
      }
      
      if (isNaN(args[1])) {
        return update.send(
          '😕 ID предмета - это число, знаешь.'
        )
      }

      await user.init()
      
      let id = parseInt(args[1])
      let item = shopData.pets.find(i => i.id === id)
      
      if (user.notEnoughFor(item.price)) {
        return update.send(
          '🧮 Недостаточно денег - у тебя ' + user.data.amount + 'T, а нужно ' + item.price + 'T'
        )
      }
      
      user.subtract(item.price)
      user.addItem(item.id)

      return update.send(
        `🎉 Теперь у ${name[0].first_name} есть предмет ${item.name}\n` + 
        '\n  Чтобы продать, нужно написать после команды слово "продать" и номер вещи в профиле  '
      )
    }
    
    async function sendSellMenu() {
      let name = await api.users.get({
        user_ids: update.senderId,
      })
      let user = new User(update.senderId)

      if (!args[1]) {
        return update.send(
          '😕 Ты не ввел номер предмета, который хочешь продать'
        )
      }
      
      if (isNaN(args[1])) {
        return update.send(
          '😕 Номер предмета - это число, знаешь.'
        )
      }

      await user.init()
      
      let n = parseInt(args[1]) - 1
      let id = user.data.items[n]
      let item = shopData.pets.find(i => i.id === id)
      
      if (!id) {
        return update.send(
          '🧮 У тебя нет предмета под таким номером'
        )
      }
      
      if (!item) {
        return update.send(
          '❌ У тебя есть несуществующий предмет'
        )
      }
      
      user.add(item.price)
      user.removeItem(n)

      return update.send(
        `🎉 ${name[0].first_name} продал предмет ${item.name} за ${item.price}T`
      )
    }
    
  } catch (e) {
    handleError(update, e)
  }
}

exports.command = {
  'arguments': false,
  'description': {
    'en': 'Buy, sell or manage your pet',
    'ru': 'Купить, продать, ебать животное'
  },
  'alias': [
    'животное',
    'питомец'
  ],
  hidden: true
}
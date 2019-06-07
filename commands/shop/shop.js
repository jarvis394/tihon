/* eslint-disable no-unused-vars */

const { handleError } = require('../../utils')
const data = require('../../shopData')
const User = require('../../lib/User')

const aliases = {
  buy: ['buy', 'купить', 'купитт', 'купля', 'куплч'],
  sell: ['sell', 'продать', 'продат', 'продатб', 'продажа']
}

exports.run = async (api, update, args) => {
  try {

    // If no args then will send menu
    if (!args[0]) return sendMenu()

    // Init option
    let option = args[0].toLowerCase()

    // If matches a group
    if (!isNaN(option)) {
      if (parseInt(option) < data.groups.length && parseInt(option) >= 0) return sendGroup(parseInt(option))
      else return update.send('😟 Нет такой группы! Введи валидный \'groupId\'')
    }

    // If option is 'buy' then send buyMenu
    if (aliases.buy.includes(option)) return sendBuyMenu()

    // Otherwise, on 'sell' send sellMenu
    if (aliases.sell.includes(option)) return sendSellMenu()

    // In any other case send error
    return update.send('🧐 Опция не найдена')

    /**
     * Sends catalog menu
     */
    async function sendMenu() {
      let name = await api.users.get({
        user_ids: update.senderId
      })

      let res = [name[0].first_name + ', разделы магазина:', '']
      
      for (let category in data.categories) {
        res.push(data.categories[category].icon + ' ' + data.categories[category].name + ':')

        for (let group of data.groups.filter(g => g.category === category)) {
          res.push('⠀⠀' + '[ ' + group.groupId + ' ] ' + group.icon + ' ' + group.name)
        }

        res.push('')
      }
      
      res.push('')
      res.push('Чтобы посмотреть группу, напишите её [ ID ]:')
      res.push('@tihon_bot, магазин 2')

      return update.send(res.join('\n'))
    }

    /**
     * Send group menu
     * @param {string} group Group
     */
    async function sendGroup(groupId) {
      let name = await api.users.get({
        user_ids: update.senderId
      })
      
      let group = data.groups.find(g => g.groupId === groupId)
      let res = [name[0].first_name + ', раздел \'' + group.name + '\':', '']

      data.items.forEach((item, i) => {
        if (item.groupId === groupId) {
          res.push(
            `[ ${item.id} ] ${item.icon} ${item.name} - ${item.price}T`
          )
          
          if (item.earning) {
            res.push(
              `⠀⠀⠀⠀- ${item.earning}T/час`
            )
          }
        }
      })

      res.push('')
      res.push('Чтобы купить, напишите "купить" и [ ID ]:')
      res.push('@tihon_bot, магазин купить 16')

      return update.send(res.join('\n'))
    }

    /**
     * Sends buying menu
     */
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
      let item = data.items.find(i => i.id === id)
      
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
    
    /**
     * Sends selling menu
     */
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
      let item = data.items.find(i => i.id === id)
      
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
  name: 'shop',
  arguments: false,
  description: {
    en: 'Go to the supermarket :p',
    ru: 'Сходить в супермаркет :p'
  },
  alias: ['шоп', 'магазин', 'ларёк', 'ларек'],
  group: 'shop'
}

/* eslint-disable no-unused-vars */

const { handleError } = require('../../utils')
const data = require('../../shopData')
const coins = require('../../lib/User')

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
    if (option.test(/[0-9]/)) return sendGroup(option)

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

      for (let group in data) {
        res.push(data[group].icon + ' ' + data[group].name + ':')

        for (let item of data[group].items) {
          res.push('⠀⠀' + item.icon + ' ' + item.name)
        }

        res.push('')
      }

      return update.send(res.join('\n'))
    }

    /**
     * Send group menu
     * @param {string} group Group
     */
    async function sendGroup(group) {
      let name = await api.users.get({
        user_ids: update.senderId
      })

      let res = [name[0].first_name + ", раздел '" + group + "':", '']

      group = data.groups[group].items

      for (let i = 0; i < group.length; i++) {
        res.push(
          i +
            1 +
            ') ' +
            group[i].icon +
            ' ' +
            group[i].name +
            ' - ' +
            group[i].price +
            'T'
        )
      }

      res.push('')
      res.push('Чтобы купить, напишите "купить" и ID:')
      res.push('/shop buy 3')

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

      let user = await coins.data(update.senderId)

      if (!user.items) {
        user.items = []
        coins.setData(update.senderId, user)
      }

      let category = data.groups[args[1]].path
      let cIndex = data.groups[args[1]].index
      let item = parseInt(args[2])

      if (!category) return update.send('😖 Ты не ввел нормально категорию')
      if (category && !item)
        return update.send(
          '😕 Ты не ввел нормально предмет, который хочешь купить'
        )

      let i = data[category].items[cIndex].items[item - 1]

      user.items.push(i)

      await coins.setData(update.senderId, user)

      return update.send(
        `🎉 Теперь у ${name[0].first_name} есть предмет ${i.name}`
      )
    }

    /**
     * Sends selling menu
     */
    function sendSellMenu() {

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

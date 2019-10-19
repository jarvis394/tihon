exports.run = async ({ update, args }) => {
  const data = require('../../configs/data/shop')
  const { getGroupById } = require('../../utils/shop')
  const format = require('../../utils/format')
  const { api } = require('../../globals')

  // If no args then will send menu
  if (!args[0]) return sendMenu()

  // Init option
  let option = args[0].toLowerCase()

  // If matches a group
  if (!isNaN(option)) {
    if (parseInt(option) <= data.groups.length && parseInt(option) >= 0)
      return sendGroup(parseInt(option))
    else return '😟 Нет такой группы! Введи валидный [ ID ]'
  }

  /**
   * Sends catalog menu
   */
  async function sendMenu() {
    let name = await api.users.get({
      user_ids: update.senderId,
    })

    let res = [name[0].first_name + ', разделы магазина:', '']

    for (let category in data.categories) {
      res.push(
        data.categories[category].icon +
          ' ' +
          data.categories[category].name +
          ':'
      )

      for (let group of data.groups.filter(g => g.category === category)) {
        res.push('⠀⠀' + '[ ' + group.id + ' ] ' + group.icon + ' ' + group.name)
      }

      res.push('')
    }

    res.push('')
    res.push('Чтобы посмотреть группу, напишите её [ ID ]:')
    res.push('@tihon_bot, магазин 2')

    return res.join('\n')
  }

  /**
   * Send group menu
   * @param {string} group Group
   */
  async function sendGroup(groupId) {
    let name = await api.users.get({
      user_ids: update.senderId,
    })

    let group = getGroupById(groupId)
    let res = [name[0].first_name + ', раздел \'' + group.name + '\':', '']

    data.items.forEach((item, i) => {
      if (item.groupId === groupId) {
        res.push(
          `[ ${item.id} ] ${item.icon} ${item.name} ${
            item.earning ? '- ' + format(item.earning) + ' ₮/12h' : ''
          }`
        )
        res.push(
          `${Array(item.id.toString().length > 1 ? 8 : 6)
            .fill(' ')
            .join('')}- ${format(item.price)} ₮ | 💠 ${format(item.rep)} R`
        )
      }
    })

    res.push('')
    res.push('Чтобы купить, напишите "купить" и [ ID ]:')
    res.push('@tihon_bot, купить 16')

    return res.join('\n')
  }
}

exports.command = {
  name: 'shop',
  arguments: false,
  description: {
    en: 'Go to the supermarket',
    ru: 'Сходить в супермаркет',
  },
  alias: ['шоп', 'магазин', 'ларёк', 'ларек'],
  group: 'shop',
}

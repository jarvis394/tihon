// TODO: Translate to English

const Item = require('./lib/Item')
const Category = require('./lib/Category')
const Group = require('./lib/Group')
const Pet = require('./lib/Pet')

module.exports.categories = {
  realty: new Category({
    icon: '🌇',
    name: 'Недвижимость'
  }),
  other: new Category({
    icon: '📌',
    name: 'Остальное'
  })
}

module.exports.groups = [
  new Group({
    category: 'realty',
    icon: '🌇',
    title: 'houses',   
    name: 'Дома',
    groupId: 1,
    maxItems: 3
  }),
  new Group({
    category: 'other',
    icon: '🍎',
    title: 'farms',    
    name: 'Огороды',
    groupId: 2,
    maxItems: 5
  }),
  new Group({
    category: 'other',
    icon: '👙',
    title: 'clothes',    
    name: 'Одежда',
    groupId: 3,
    maxItems: 0
  }),
  new Group({
    category: 'other',
    icon: '⚰️',
    title: 'coffins',    
    name: 'Гробы',
    groupId: 4,
    maxItems: 1
  })
]

let items = [
  new Item({
    name: 'Коробка',
    icon: '📦',
    price: 10,
    groupId: 1
  }),
  new Item({
    name: 'Шалаш',
    icon: '⛺',
    price: 250,
    groupId: 1
  }),
  new Item({
    name: 'Съемная квартира',
    icon: '🛏️',
    price: 5000,
    groupId: 1
  }),
  new Item({
    name: 'Заброшенный дом',
    icon: '🏚️',
    price: 10000,
    groupId: 1
  }),
  new Item({
    name: 'Квартира в Нижнем Новгороде',
    icon: '🏢',
    price: 50000,
    groupId: 1
  }),
  new Item({
    name: 'Пентхаус в Буграх',
    icon: '🕋',
    price: 100000,
    groupId: 1
  }),
  new Item({
    name: 'Горшок',
    icon: '⚱️',
    price: 100,
    groupId: 2,
    earning: 25
  }),
  new Item({
    name: 'Садик',
    icon: '🍒',
    price: 500,
    groupId: 2,
    earning: 125
  }),
  new Item({
    name: 'Палисадник',
    icon: '🥒',
    price: 1000,
    groupId: 2,
    earning: 250
  }),
  new Item({
    name: 'Грядка',
    icon: '🍸',
    price: 10000,
    groupId: 2,
    earning: 2500
  }),
  new Item({
    name: 'Огород',
    icon: '🍓',
    price: 25000,
    groupId: 2,
    earning: 6250
  }),
  new Item({
    name: 'Плантация',
    icon: '🍀',
    price: 50000,
    groupId: 2,
    earning: 12500
  })
]

const pets = [
  new Pet({
    name: 'Кот',
    icon: '🐈',
    price: 100,
  }),
  new Pet({
    name: 'Шавка',
    icon: '🐕',
    price: 100,
  }),
  new Pet({
    name: 'Бабуин',
    icon: '🦍',
    price: 100,
  }),
  new Pet({
    name: 'Микробы',
    icon: '🦠',
    price: 100,
  }),
  new Pet({
    name: 'Паук',
    icon: '🕷️',
    price: 100,
  }),
  new Pet({
    name: 'Комар',
    icon: '🦟',
    price: 100,
  }),
  new Pet({
    name: 'Единорог',
    icon: '🦄',
    price: 100,
  })
]

items.forEach((item, i) => item.id = (i + 1))
pets.forEach((pet, i) => pet.id = (i + 1))

module.exports.items = items
module.exports.pets = pets

module.exports.getGroupById = (id) => module.exports.groups.find(i => i.groupId === id)
module.exports.getGroupByTitle = (title) => module.exports.groups.find(i => i.title === title)
module.exports.getGroupByName = (name) => module.exports.groups.find(i => i.name.toLowerCase() === name.toLowerCase())
module.exports.getItemById = (id) => items.find(i => i.id === id)
module.exports.getItemsByGroupId = (id) => items.filter(i => i.groupId === id)
module.exports.getPetById = (id) => items.find(i => i.id === id)

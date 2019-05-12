// TODO: Use classes and integrate OOP
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
    name: 'Дома',
    groupId: 1
  }),
  new Group({
    category: 'other',
    icon: '🍎',
    name: 'Огороды', 
    groupId: 2
  }),
  new Group({
    category: 'other',
    icon: '👙',
    name: 'Одежда', 
    groupId: 3
  }),
  new Group({
    category: 'other',
    icon: '⚰️',
    name: 'Гробы',
    groupId: 4
  })
]

module.exports.items = [
  new Item({
    name: 'Коробка',
    icon: '📦',
    price: 10,
    id: 1,
    groupId: 1
  }),
  new Item({
    name: 'Шалаш',
    icon: '⛺',
    price: 250,
    id: 2,
    groupId: 1
  }),
  new Item({
    name: 'Съемная квартира',
    icon: '🛏️',
    price: 5000,
    id: 3,
    groupId: 1
  }),
  new Item({
    name: 'Заброшенный дом',
    icon: '🏚️',
    price: 10000,
    id: 4,
    groupId: 1
  }),
  new Item({
    name: 'Квартира в Нижнем Новгороде',
    icon: '🏢',
    price: 50000,
    id: 5,
    groupId: 1
  }),
  new Item({
    name: 'Пентхаус в Буграх',
    icon: '🕋',
    price: 100000,
    id: 6,
    groupId: 1
  }),
  new Item({
    name: 'Горшок',
    icon: '⚱️',
    price: 100,
    id: 14,
    groupId: 2
  }),
  new Item({
    name: 'Палисадник',
    icon: '🥒',
    price: 1000,
    id: 15,
    groupId: 2
  }),
  new Item({
    name: 'Садик',
    icon: '🍒',
    price: 500,
    id: 16,
    groupId: 2
  }),
  new Item({
    name: 'Грядка',
    icon: '🍸',
    price: 10000,
    id: 17,
    groupId: 2
  }),
  new Item({
    name: 'Огород',
    icon: '🍓',
    price: 25000,
    id: 18,
    groupId: 2
  }),
  new Item({
    name: 'Плантация',
    icon: '🍀',
    price: 50000,
    id: 19,
    groupId: 2
  })
]

module.exports.pets = [
  new Pet({
    name: 'Кот',
    icon: '🐈',
    price: 100,
    id: 7
  }),
  new Pet({
    name: 'Шавка',
    icon: '🐕',
    price: 100,
    id: 8
  }),
  new Pet({
    name: 'Бабуин',
    icon: '🦍',
    price: 100,
    id: 9
  }),
  new Pet({
    name: 'Микробы',
    icon: '🦠',
    price: 100,
    id: 10
  }),
  new Pet({
    name: 'Паук',
    icon: '🕷️',
    price: 100,
    id: 11
  }),
  new Pet({
    name: 'Комар',
    icon: '🦟',
    price: 100,
    id: 12
  }),
  new Pet({
    name: 'Единорог',
    icon: '🦄',
    price: 100,
    id: 13
  })
]
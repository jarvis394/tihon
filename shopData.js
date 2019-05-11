// TODO: Use classes and integrate OOP
// TODO: Translate to English

const Item = require('./lib/Item')
const Category = require('./lib/Category')
const Group = require('./lib/Group')

/*module.exports = {
  realty: {
    name: 'Недвижимость',
    icon: '🌇',
    items: [
      {
        name: 'Дома',
        icon: '🏠',
        items: [
          {
            name: 'Коробка',
            icon: '📦',
            price: 10
          },
          {
            name: 'Шалаш',
            icon: '⛺',
            price: 250
          },
          {
            name: 'Съемная квартира',
            icon: '🛏️',
            price: 5000
          },
          {
            name: 'Заброшенный дом',
            icon: '🏚️',
            price: 10000
          },
          {
            name: 'Квартира в Нижнем Новгороде',
            icon: '🏢',
            price: 50000
          },
          {
            name: 'Пентхаус в Буграх',
            icon: '🕋',
            price: 100000
          }
        ]
      }
    ]
  },
  pets: {
    name: 'Питомцы',
    icon: '🐌',
    items: [
      {
        name: 'Кот',
        icon: '🐈',
        price: 100
      },
      {
        name: 'Шавка',
        icon: '🐕',
        price: 100
      },
      {
        name: 'Бабуин',
        icon: '🦍',
        price: 100
      },
      {
        name: 'Микробы',
        icon: '🦠',
        price: 100
      },
      {
        name: 'Паук',
        icon: '🕷️',
        price: 100
      },
      {
        name: 'Комар',
        icon: '🦟',
        price: 100
      },
      {
        name: 'Единорог',
        icon: '🦄',
        price: 100
      }
    ]
  },
  other: {
    name: 'Остальное',
    icon: '📌',
    items: [
      {
        name: 'Огороды',
        icon: '🍎',
        items: [
          {
            name: 'Горшок',
            icon: '⚱️',
            price: 100
          },
          {
            name: 'Палисадник',
            icon: '🥒',
            price: 1000
          },
          {
            name: 'Садик',
            icon: '🍒',
            price: 5000
          },
          {
            name: 'Грядка',
            icon: '🍸',
            price: 10000
          },
          {
            name: 'Огород',
            icon: '🍓',
            price: 25000
          },
          {
            name: 'Плантация',
            icon: '🍀',
            price: 50000
          }
        ]
      },
      {
        name: 'Одежда',
        icon: '👙',
        items: []
      },
      {
        name: 'Гробы',
        icon: '⚰️',
        items: []
      }
    ]
  }
}*/

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
    name: 'Кот',
    icon: '🐈',
    price: 100,
    id: 7,
    groupId: 999
  }),
  new Item({
    name: 'Шавка',
    icon: '🐕',
    price: 100,
    id: 8,
    groupId: 999
  }),
  new Item({
    name: 'Бабуин',
    icon: '🦍',
    price: 100,
    id: 9,
    groupId: 999
  }),
  new Item({
    name: 'Микробы',
    icon: '🦠',
    price: 100,
    id: 10,
    groupId: 999
  }),
  new Item({
    name: 'Паук',
    icon: '🕷️',
    price: 100,
    id: 11,
    groupId: 999
  }),
  new Item({
    name: 'Комар',
    icon: '🦟',
    price: 100,
    id: 12,
    groupId: 999
  }),
  new Item({
    name: 'Единорог',
    icon: '🦄',
    price: 100,
    id: 13,
    groupId: 999
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
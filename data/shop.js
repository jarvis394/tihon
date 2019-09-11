const Item = require('../lib/Item')
const Category = require('../lib/Category')
const Group = require('../lib/Group')
const Pet = require('../lib/Pet')

module.exports.categories = {
  transport: new Category({
    icon: '🚏',
    name: 'Транспорт',
  }),
  realty: new Category({
    icon: '🌇',
    name: 'Недвижимость',
  }),
  other: new Category({
    icon: '📌',
    name: 'Остальное',
  }),
}

module.exports.groups = [
  new Group({
    category: 'realty',
    icon: '🌇',
    accName: 'дом',
    title: 'houses',
    name: 'Дома',
    groupId: 1,
    maxItems: 1,
  }),
  new Group({
    category: 'other',
    icon: '🍎',
    accName: 'огород',
    title: 'farms',
    name: 'Огороды',
    groupId: 2,
    maxItems: 1,
  }),
  new Group({
    category: 'other',
    icon: '👙',
    accName: 'одежду',
    title: 'clothes',
    name: 'Одежда',
    groupId: 3,
    maxItems: 1,
  }),
  new Group({
    category: 'other',
    icon: '⚰️',
    accName: 'гроб',
    title: 'coffins',
    name: 'Гробы',
    groupId: 4,
    maxItems: 1,
  }),
]

const items = [
  // Houses
  new Item({
    name: 'Коробка',
    icon: '📦',
    price: 100,
    groupId: 1,
    rep: 1,
  }),
  new Item({
    name: 'Шалаш',
    icon: '⛺',
    price: 500,
    groupId: 1,
    rep: 25,
  }),
  new Item({
    name: 'Заброшенный дом',
    icon: '🏚️',
    price: 5000,
    groupId: 1,
    rep: 250,
  }),
  new Item({
    name: 'Съемная квартира',
    icon: '🛏️',
    price: 15000,
    groupId: 1,
    rep: 1000,
  }),
  new Item({
    name: 'Квартира в Нижнем Новгороде',
    icon: '🏢',
    price: 50000,
    groupId: 1,
    rep: 2500,
  }),
  new Item({
    name: 'Пентхаус в Буграх',
    icon: '🕋',
    price: 100000,
    groupId: 1,
    rep: 5000,
  }),

  // Farms
  new Item({
    name: 'Горшок',
    icon: '⚱️',
    price: 1000,
    groupId: 2,
    earning: 100,
    rep: 1,
  }),
  new Item({
    name: 'Садик',
    icon: '🍒',
    price: 10000,
    groupId: 2,
    earning: 250,
    rep: 10,
  }),
  new Item({
    name: 'Палисадник',
    icon: '🥒',
    price: 25000,
    groupId: 2,
    earning: 500,
    rep: 25,
  }),
  new Item({
    name: 'Грядка',
    icon: '🍸',
    price: 100000,
    groupId: 2,
    earning: 2500,
    rep: 100,
  }),
  new Item({
    name: 'Огородик',
    icon: '🍓',
    price: 250000,
    groupId: 2,
    earning: 6000,
    rep: 500,
  }),
  new Item({
    name: 'Плантация',
    icon: '🍀',
    price: 500000,
    groupId: 2,
    earning: 12500,
    rep: 1000,
  }),

  // Clothes
  new Item({
    name: 'Сельский прикид',
    icon: '👨‍🌾',
    price: 50000,
    groupId: 3,
    rep: 500,
  }),
  new Item({
    name: 'Sperman',
    icon: '💦',
    price: 50000,
    groupId: 3,
    rep: 500,
  }),
  new Item({
    name: 'Костюм',
    icon: '👔',
    price: 50000,
    groupId: 3,
    rep: 500,
  }),

  // Coffins
  new Item({
    name: 'Деревянная коробка',
    icon: '📦',
    price: 10000,
    groupId: 4,
    rep: 50,
  }),
  new Item({
    name: 'Обитый бархатом гроб',
    icon: '✨',
    price: 50000,
    groupId: 4,
    rep: 100,
  }),
  new Item({
    name: 'Гроб Аргентина',
    icon: '⚰',
    price: 100000,
    groupId: 4,
    rep: 150,
  }),
  new Item({
    name: 'Гроб Россия',
    icon: '🇷🇺',
    price: 150000,
    groupId: 4,
    rep: 200,
  }),
  new Item({
    name: 'Гроб Белая Роза',
    icon: '🌹',
    price: 250000,
    groupId: 4,
    rep: 250,
  }),
  new Item({
    name: 'Золотой гроб',
    icon: '👑',
    price: 500000,
    groupId: 4,
    rep: 500,
  }),
]

const pets = [
  new Pet({
    name: 'Кот',
    icon: '🐈',
    price: 10000,
  }),
  new Pet({
    name: 'Шавка',
    icon: '🐕',
    price: 10000,
  }),
  new Pet({
    name: 'Бабуин',
    icon: '🦍',
    price: 20000,
  }),
  new Pet({
    name: 'Микробы',
    icon: '🦠',
    price: 50000,
  }),
  new Pet({
    name: 'Паук',
    icon: '🕷️',
    price: 50000,
  }),
  new Pet({
    name: 'Комар',
    icon: '🦟',
    price: 100000,
  }),
  new Pet({
    name: 'Единорог',
    icon: '🦄',
    price: 250000,
  }),
]

items.forEach((item, i) => (item.id = i + 1))
pets.forEach((pet, i) => (pet.id = i + 1))

module.exports.items = items
module.exports.pets = pets

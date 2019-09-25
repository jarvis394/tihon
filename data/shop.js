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
  business: new Category({
    icon: '👔',
    name: 'Бизнес',
  }),
  other: new Category({
    icon: '📌',
    name: 'Остальное',
  }),
}

let groups = [
  new Group({
    category: 'transport',
    icon: '🚙',
    profileName: 'Машина',
    title: 'cars',
    name: 'Машины',
  }),
  new Group({
    category: 'transport',
    icon: '⛵',
    profileName: 'Яхта',
    title: 'yachts',
    name: 'Яхты',
  }),

  new Group({
    category: 'realty',
    icon: '🏠',
    profileName: 'Дом',
    title: 'houses',
    name: 'Дома',
  }),

  new Group({
    category: 'business',
    icon: '🍎',
    profileName: 'Огород',
    title: 'farms',
    name: 'Огороды',
  }),
  new Group({
    category: 'business',
    icon: '🏢',
    profileName: 'Предприятие',
    title: 'companies',
    name: 'Предприятия',
  }),

  new Group({
    category: 'other',
    icon: '👙',
    profileName: 'Одежда',
    title: 'clothes',
    name: 'Одежда',
  }),
  new Group({
    category: 'other',
    icon: '⚰️',
    profileName: 'Гроб',
    title: 'coffins',
    name: 'Гробы',
  }),
  new Group({
    category: 'other',
    icon: '💻',
    profileName: 'Компьютер',
    title: 'computers',
    name: 'Компьютеры',
  }),
  new Group({
    category: 'other',
    icon: '📱',
    profileName: 'Телефон',
    title: 'smartphones',
    name: 'Телефоны',
  }),
]

const items = [
  // Cars
  new Item({
    name: 'Газонокосилка',
    icon: '🔻',
    price: 5000,
    group: 'cars',
    rep: 100,
  }),
  new Item({
    name: 'Гироскутер',
    icon: '🔻',
    price: 10000,
    group: 'cars',
    rep: 200,
  }),
  new Item({
    name: 'ГАЗ-3110 Волга',
    icon: '🔻',
    price: 15000,
    group: 'cars',
    rep: 300,
  }),
  new Item({
    name: 'Audi OGOROD Edition',
    icon: '🔻',
    price: 25000,
    group: 'cars',
    rep: 500,
  }),
  new Item({
    name: 'BMW QFarmer',
    icon: '🔻',
    price: 50000,
    group: 'cars',
    rep: 1000,
  }),
  new Item({
    name: 'Tesla Model F',
    icon: '🔻',
    price: 100000,
    group: 'cars',
    rep: 2000,
  }),
  new Item({
    name: 'Rolls-Royce TFarmer',
    icon: '🔻',
    price: 250000,
    group: 'cars',
    rep: 5000,
  }),
  new Item({
    name: 'Ferrari LaFarmer',
    icon: '🔻',
    price: 500000,
    group: 'cars',
    rep: 10000,
  }),
  new Item({
    name: 'Унитаз на колёсиках',
    icon: '🔻',
    price: 1000000,
    group: 'cars',
    rep: 20000,
  }),

  // Yachts
  new Item({
    name: 'Ванна',
    icon: '🔻',
    price: 5000,
    group: 'yachts',
    rep: 100,
  }),
  new Item({
    name: 'Сельская Принцесса',
    icon: '🔻',
    price: 50000,
    group: 'yachts',
    rep: 1000,
  }),
  new Item({
    name: 'FarmerX',
    icon: '🔻',
    price: 100000,
    group: 'yachts',
    rep: 2000,
  }),
  new Item({
    name: 'Водный Трактор',
    icon: '🔻',
    price: 300000,
    group: 'yachts',
    rep: 6000,
  }),
  new Item({
    name: 'Omsk V',
    icon: '🔻',
    price: 500000,
    group: 'yachts',
    rep: 10000,
  }),
  new Item({
    name: 'xX_FLYING-OGOROD_Xx',
    icon: '🔻',
    price: 1000000,
    group: 'yachts',
    rep: 15000,
  }),

  // Houses
  new Item({
    name: 'Коробка',
    icon: '📦',
    price: 1000,
    group: 'houses',
    rep: 25,
  }),
  new Item({
    name: 'Шалаш',
    icon: '⛺',
    price: 5000,
    group: 'houses',
    rep: 100,
  }),
  new Item({
    name: 'Заброшенный дом',
    icon: '🏚️',
    price: 25000,
    group: 'houses',
    rep: 500,
  }),
  new Item({
    name: 'Съемная квартира',
    icon: '🛏️',
    price: 50000,
    group: 'houses',
    rep: 1000,
  }),
  new Item({
    name: 'Квартира в Нижнем Новгороде',
    icon: '🏢',
    price: 100000,
    group: 'houses',
    rep: 2000,
  }),
  new Item({
    name: 'Пентхаус в Буграх',
    icon: '🕋',
    price: 250000,
    group: 'houses',
    rep: 5000,
  }),

  // Farms
  new Item({
    name: 'Горшок',
    icon: '⚱️',
    price: 1000,
    group: 'farms',
    earning: 100,
    rep: 25,
  }),
  new Item({
    name: 'Садик',
    icon: '🍒',
    price: 5000,
    group: 'farms',
    earning: 250,
    rep: 100,
  }),
  new Item({
    name: 'Палисадник',
    icon: '🥒',
    price: 20000,
    group: 'farms',
    earning: 500,
    rep: 400,
  }),
  new Item({
    name: 'Грядка',
    icon: '🍸',
    price: 50000,
    group: 'farms',
    earning: 2500,
    rep: 1000,
  }),
  new Item({
    name: 'Огородик',
    icon: '🍓',
    price: 100000,
    group: 'farms',
    earning: 6000,
    rep: 2000,
  }),
  new Item({
    name: 'Плантация',
    icon: '🍀',
    price: 250000,
    group: 'farms',
    earning: 12500,
    rep: 5000,
  }),

  // Companies
  new Item({
    name: 'Minecraft сервер',
    icon: '🔻',
    price: 1000,
    earning: 150,
    group: 'companies',
    rep: 25,
  }),
  new Item({
    name: 'Реселлинг',
    icon: '🔻',
    price: 5000,
    earning: 300,
    group: 'companies',
    rep: 100,
  }),
  new Item({
    name: 'Кафе "В Колхозе"',
    icon: '🔻',
    price: 25000,
    earning: 750,
    group: 'companies',
    rep: 500,
  }),
  new Item({
    name: 'Бордель "Помидор"',
    icon: '🔻',
    price: 100000,
    earning: 8000,
    group: 'companies',
    rep: 2000,
  }),
  new Item({
    name: 'Торговля сельхозтехникой',
    icon: '🔻',
    price: 250000,
    earning: 15000,
    group: 'companies',
    rep: 5000,
  }),
  new Item({
    name: '1xbet стратег',
    icon: '🔻',
    price: 500000,
    earning: 30000,
    group: 'companies',
    rep: 10000,
  }),

  // Clothes
  new Item({
    name: 'Сельский прикид',
    icon: '👨‍🌾',
    price: 50000,
    group: 'clothes',
    rep: 1000,
  }),
  new Item({
    name: 'Худи Sperman',
    icon: '💦',
    price: 50000,
    group: 'clothes',
    rep: 1000,
  }),
  new Item({
    name: 'Навозный костюм',
    icon: '👔',
    price: 50000,
    group: 'clothes',
    rep: 1000,
  }),
  new Item({
    name: 'Пакет',
    icon: '🎽',
    price: 50000,
    group: 'clothes',
    rep: 1000,
  }),

  // Coffins
  new Item({
    name: 'Деревянная коробка',
    icon: '📦',
    price: 10000,
    group: 'coffins',
    rep: 200,
  }),
  new Item({
    name: 'Обитый бархатом гроб',
    icon: '✨',
    price: 50000,
    group: 'coffins',
    rep: 1000,
  }),
  new Item({
    name: 'Гроб Аргентина',
    icon: '⚰',
    price: 100000,
    group: 'coffins',
    rep: 2000,
  }),
  new Item({
    name: 'Гроб Россия',
    icon: '🇷🇺',
    price: 150000,
    group: 'coffins',
    rep: 3000,
  }),
  new Item({
    name: 'Гроб Белая Роза',
    icon: '🌹',
    price: 250000,
    group: 'coffins',
    rep: 5000,
  }),
  new Item({
    name: 'Золотой гроб',
    icon: '👑',
    price: 500000,
    group: 'coffins',
    rep: 10000,
  }),

  // Computers
  new Item({
    name: 'HP 2077',
    icon: '🔻',
    price: 5000,
    group: 'computers',
    rep: 100,
  }),
  new Item({
    name: 'DELL-WO7K',
    icon: '🔻',
    price: 15000,
    group: 'computers',
    rep: 300,
  }),
  new Item({
    name: 'xxyyee PCHACK',
    icon: '🔻',
    price: 50000,
    group: 'computers',
    rep: 1000,
  }),

  // Smartphones
  new Item({
    name: 'Огурец',
    icon: '🔻',
    price: 5000,
    group: 'smartphones',
    rep: 100,
  }),
  new Item({
    name: 'Nokia 3310',
    icon: '🔻',
    price: 10000,
    group: 'smartphones',
    rep: 200,
  }),
  new Item({
    name: 'Sony P1KLE',
    icon: '🔻',
    price: 30000,
    group: 'smartphones',
    rep: 600,
  }),
  new Item({
    name: 'iPhone XO',
    icon: '🔻',
    price: 50000,
    group: 'smartphones',
    rep: 1000,
  }),
  new Item({
    name: 'Xiaomi DELUXE FARMER',
    icon: '🔻',
    price: 100000,
    group: 'smartphones',
    rep: 2000,
  }),
  new Item({
    name: 'xxyyee Smartfarm',
    icon: '🔻',
    price: 500000,
    group: 'smartphones',
    rep: 10000,
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

groups.forEach((group, i) => {
  group.id = i + 1
})
items.forEach((item, i) => {
  item.id = i + 1
  item.groupId = groups.find(e => item.group === e.title).id
})
pets.forEach((pet, i) => (pet.id = i + 1))

module.exports.groups = groups
module.exports.items = items
module.exports.pets = pets

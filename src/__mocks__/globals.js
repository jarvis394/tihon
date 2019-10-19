const users = [
  {
    id: 1,
    member_id: 1,
    is_admin: true,
    first_name: 'Dan',
    last_name: 'Federick',
  },
  {
    id: 2,
    member_id: 2,
    is_admin: false,
    first_name: 'Nick',
    last_name: 'Fury',
  },
  {
    id: 3,
    member_id: 3,
    is_admin: false,
    first_name: 'Kevin',
    last_name: 'Anderson',
  },
  {
    id: 4,
    member_id: 4,
    is_admin: false,
    first_name: 'Jack',
    last_name: 'Frost',
  },
  {
    id: 5,
    member_id: 5,
    is_admin: false,
    first_name: 'Nill',
    last_name: 'Brendon',
  },
  {
    id: 6,
    member_id: 6,
    is_admin: false,
    first_name: 'Norman',
    last_name: 'Jenn',
  },
  {
    id: 7,
    member_id: 7,
    is_admin: false,
    first_name: 'Zee',
    last_name: 'Fenrich',
  },
  {
    id: 8,
    member_id: 8,
    is_admin: false,
    first_name: 'Erny',
    last_name: 'Ilkoy',
  },
  {
    id: 9,
    member_id: 9,
    is_admin: false,
    first_name: 'Bill',
    last_name: 'Neuman',
  },
  {
    id: 10,
    member_id: 10,
    is_admin: false,
    first_name: 'George',
    last_name: 'Erston',
  },
  {
    id: 11,
    member_id: 11,
    is_admin: false,
    first_name: 'Opry',
    last_name: 'Astern',
  },
]

module.exports = {
  db: {},
  updates: {},
  vk: {},
  api: {
    messages: {
      getConversationMembers: () => ({
        count: users.slice(0, 3).length,
        items: users.slice(0, 3),
        profiles: users.slice(0, 3),
      }),
    },
  },
}

const users = new Map()

/**
 * Gets user's data from store
 * @param {string} id User's ID
 */
const get = (id) => {
  return users.get(id)
}

/**
 * Sets data to user in store
 * @param {string} id User's ID
 * @param {any} data Data to set
 */
const set = (id, data) => {
  users.set(id, data)
  console.log(id, data, users)
}

/**
 * Runs function to each user in store
 * @param {function} func Function to run
 */
const forEach = (func) => {
  for (let id in users) {
    func(users.get(id), id)
  }
}

module.exports = {
  get,
  set,
  forEach,
  users
}

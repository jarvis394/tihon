/**
 * Returns random item from array
 *
 * @param {array} array Array
 * @returns {any} Item from array
 */
const randomArray = array => {
  return array[Math.floor(Math.random() * array.length)]
}

/**
 * Returns random value between min and max
 *
 * @param {value} min Minimum
 * @param {value} max Maximum
 * @returns {value} Random value
 */
const random = (min = 0, max = 1) => {
  let rand = min - 0.5 + Math.random() * (max - min + 1)
  rand = Math.round(rand)
  return rand
}

module.exports = {
  random,
  randomArray,
}

module.exports.randomArray = (array) => {
  return array[Math.floor(Math.random()*array.length)];
}

module.exports.random = (min, max) => {
  var rand = min - 0.5 + Math.random() * (max - min + 1)
  rand = Math.round(rand);
  return rand;
}
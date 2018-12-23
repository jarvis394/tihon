const math = require('mathjs');

exports.run = (api, update, args) => {
  
  var resp;
  var calc = args.join(' ');
  
  try {
    resp = math.eval(calc);
  } catch (e) {
    return update.send("Похоже, я слишком тупой для таких примеров");
  }
  
  update.send(`Ввод: ${calc}\nВывод: ${resp}`);

}
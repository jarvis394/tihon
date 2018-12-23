const fs = require("fs");
const blacklist = JSON.parse(fs.readFileSync("./blacklist.json", "utf8"));

exports.run = (api, update, args) => {
  
  if (blacklist[update.peerId]) {
    blacklist[update.peerId] = false;
    update.send("Теперь тут будет отправляться рассылка")
  } else {
    blacklist[update.peerId] = true;
    update.send("Теперь здесь не будет отправляться рассылка")
  }
  
  fs.writeFile("./blacklist.json", JSON.stringify(blacklist, null, 2), (err) => {
    if (err) return console.log("> [ERROR] In no.js: \n", err)
  });
  
}
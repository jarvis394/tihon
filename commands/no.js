const fs = require("fs");
const no = JSON.parse(fs.readFileSync("./no.json", "utf8"));

exports.run = (api, update, args) => {
  
  if (no[update.peerId]) {
    no[update.peerId] = false;
    update.send("Теперь тут будет отправляться рассылка")
  } else {
    no[update.peerId] = true;
    update.send("Теперь здесь не будет отправляться рассылка")
  }
  
  fs.writeFile("./no.json", JSON.stringify(no, null, 2), (err) => {
    if (err) return console.log("> [ERROR] In no.js: \n", err)
  });
  
}
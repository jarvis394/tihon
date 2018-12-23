const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

const listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});

/////////////////////////////////////

const { VK } = require('vk-io');

const vk = new VK;
const { api, updates } = vk;
const { prefix } = require("./constants");
const { randomArray, random } = require("./utils");
const fs = require("fs");
const blacklist = JSON.parse(fs.readFileSync("./blacklist.json", "utf8"));
  
const memoryStorage = new Map();

vk.setOptions({
  token: process.env.TOKEN
});

console.log(blacklist)

setInterval(async () => {

  var Dialogs = await api.messages.getConversations({
    count: 200
  });
  var d = [];
  
  Dialogs.items.forEach(async (dialog) => {

    if (blacklist[dialog.conversation.peer.id]) return;
    
    async function getMsg() {
      var Dialogs = await api.messages.getConversations({
        count: 200
      });
      var Dialog = randomArray(Dialogs.items);
      var Messages = await api.messages.getHistory({
        peer_id: Dialog.conversation.peer.id
      });
      var Message = randomArray(Messages.items);

      return Message;
    }

    var res = "Произошла ошибочка. Я из села :(";
    var options = {};

    var msg = await getMsg();

    while (msg.text.startsWith("/") || msg.text.length > 500) {
      msg = await getMsg();
    }

    if (msg.text !== "")
      res = msg.text;
    else
      res = "";
    if (msg.attachments.length !== 0)
      if (msg.attachments[0].type === "photo") {
        var access = msg.attachments[0].photo.access_key ? "_" + msg.attachments[0].photo.access_key : "";
        options.attachment = "photo" + msg.attachments[0].photo.owner_id + "_" + msg.attachments[0].photo.id + access
      }
    
    setTimeout(() => {if (options.attachment)
      vk.api.messages.send({
        "message": res,
        "attachment": options.attachment,
        "peer_id": dialog.conversation.peer.id
      })
    else 
      vk.api.messages.send({
        "message": res,
        "peer_id": dialog.conversation.peer.id
      });
    }, random(1000, 100* 1000))

  });
  
  console.log("> [AUTO] SENT");

}, 3600 * 1000);

require("./bin/log")(updates, memoryStorage);
require("./bin/counter")(updates, api);
require("./bin/prefixCheck")(updates);
require("./bin/command")(updates, api);

async function run() {
  await vk.updates.startPolling();
  console.log('Polling started');
}

run().catch(err => {
  console.log("> [ERROR]");
  console.error(err)
});
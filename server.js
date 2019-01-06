const express = require('express');
const ejs = require("ejs");
const fs = require("fs")
const app = express();

app.use(express.static('p'));

app.get('/', (req, res) => {
  fs.readdir(__dirname + "/commands", async (err, items) => {
    var commands = [];
    
    items.forEach(item => {
      var i = require("./commands/" + item).command;
      commands.push(i);
    });
    
    ejs.renderFile(__dirname + '/v/i.html', { "commands": commands }, (err, str) => {
    if (!err)
      return res.send(str);
    else
      console.error("> [ERROR] On rendering page:\n", err),
      res.json({
        "code": 500,
        "message": "Internal error on rendering page"
      });
    });
  });
});

const listener = app.listen(process.env.PORT, () => {
  console.log('> [LOG] Started on port', listener.address().port);
});

/////////////////////////////////////

const { VK } = require('vk-io');

const vk = new VK;
const { api, updates } = vk;
  
const memoryStorage = new Map();

vk.setOptions({
  token: process.env.TOKEN
});

require("./bin/auto")(api, vk)

require("./bin/log")(updates, memoryStorage);
require("./bin/counter")(updates, api);
require("./bin/prefixCheck")(updates);
require("./bin/command")(updates, api);

async function run() {
  await vk.updates.startPolling();
  console.log('> [LOG] Polling started');
}

run().catch(err => {
  console.log("> [ERROR]");
  console.error(err)
});
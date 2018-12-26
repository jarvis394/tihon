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

require("./bin/auto")(api, random, randomArray, blacklist, vk)

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
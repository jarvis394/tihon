const {
  VK
} = require('vk-io');

const vk = new VK;
const {
  api,
  updates
} = vk;
const {
  TOKEN,
  FIREBASE_TOKEN,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DB_URL,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_SENDER_ID
} = require("./config");

const memoryStorage = new Map();
const talkedRecently = new Set();

const firebase = require("firebase");

// Initialize Firebase
var config = {
  apiKey: FIREBASE_TOKEN,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DB_URL,
  projectId: "ded-tihon",
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_SENDER_ID
};
firebase.initializeApp(config);

vk.setOptions({
  token: TOKEN
});

require("./bin/auto")(api, vk)

require("./bin/log")(updates, memoryStorage, talkedRecently);
require("./bin/counter")(updates, api);
require("./bin/mention")(updates);
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

vk.captchaHandler = async ({
  src
}, retry) => {
  console.log("> [LOG] Needed captcha:", src);
};

////////////////////////////

const express = require('express');
const ejs = require("ejs");
const fs = require("fs");
const app = express();

// Libs for command line
const cmd = require("node-cmd");

app.use(express.static('public'));
app.use(bodyParser);

app.post('/git', (req, res) => {
  if (req.headers['x-github-event']) {
    cmd.get('git pull https://github.com/jarvis394/ded_tihon.git', (err, data, stderr) => {
      console.log('> [shell]:', data, err, stderr);
    });

    cmd.run('refresh');
  }
  
  res.sendStatus(200);
});

app.get('/', (req, res) => {
  fs.readdir(__dirname + "/commands", async (err, items) => {
    if (err) {
      console.error("> [ERROR] On rendering page:\n", err)
      res.json({
        "code": 500,
        "message": "Internal error on rendering page"
      });
      
      return;
    }

    var commands = [];

    items.forEach(item => {
      var i = require("./commands/" + item).command;
      commands.push(i);
    });

    ejs.renderFile(__dirname + '/views/index.html', {
      "commands": commands
    }, (err, str) => {
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

const listener = app.listen(4000, () => {
  console.log('> [WEB] Started on port', listener.address().port);
});
const {
  VK
} = require('vk-io');
const firebase = require("firebase");

const vk = new VK;
const {
  api,
  updates
} = vk;

const memoryStorage = new Map(); // Saves counter to every dialog
const talkedRecently = new Set(); // Saves users that talked recently

const {
  TOKEN,
  FIREBASE_TOKEN,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DB_URL,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_SENDER_ID
} = require("./config");

/** INIT **/

// Initialize Firebase
let config = {
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

// Auto send messages
require("./bin/auto")(api, vk);

// Log incoming messages
require("./bin/log")(updates, memoryStorage, talkedRecently);

// Count them
require("./bin/counter")(updates, api);

// Check if user mentioned bot
require("./bin/mention")(updates);

// Check for prefix
require("./bin/prefixCheck")(updates);

// Run command
require("./bin/command")(updates, api);

async function run() {
  await vk.updates.startPolling();
  console.log('> [LOG] Polling started');
}

// Run
run().catch(e => {
  console.log("> [ERROR]");
  console.error(e);
});

// Handle captcha
vk.captchaHandler = async ({
  src
}, retry) => {
  console.log("> [LOG] Needed captcha:", src);
};

////////////// WEB //////////////

const express = require('express');
const ejs = require("ejs");
const fs = require("fs");
const bodyParser = require("body-parser").json();
const app = express();

// Lib for command line
const cmd = require("node-cmd");

app.use(express.static('public'));
app.use(bodyParser);

// Git webhooks
app.post('/git', (req, res) => {
  if (req.headers['x-github-event']) {
    cmd.run('chmod 777 git.sh');
    cmd.get('./git.sh', (err, data, stderr) => {
      console.log(data, err);
    });
    cmd.run('refresh');

    console.log("> [GIT] Updated with origin/master\n" + "        Latest commit: \n\n" + req.body.head_commit.message);
  }

  return res.sendStatus(200);
});

// Home
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
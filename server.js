const {
  VK
} = require("vk-io")
const firebase = require("firebase")

const vk = new VK
const {
  api,
  updates
} = vk
const fs = require("fs")

const memoryStorage = new Map() // Saves counter to every dialog
const talkedRecently = new Set() // Saves users that talked recently
const randomStorage = new Map() // Saves previous random messages

const {
  TOKEN,
  SECRET,
  FIREBASE_TOKEN,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DB_URL,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_SENDER_ID
} = require("./config")

/** INIT **/

// Initialize Firebase
let config = {
  apiKey: FIREBASE_TOKEN,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DB_URL,
  projectId: "ded-tihon",
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_SENDER_ID
}
firebase.initializeApp(config)

vk.setOptions({
  token: TOKEN,
  authScope: "all"
})

let cmds = []

const store = require("store")
const Coins = require("./lib/Coins")

// Init commands list
fs.readdirSync(__dirname + "/commands").forEach(group => {
  fs.readdirSync(__dirname + "/commands/" + group).forEach(cmd => {
    let i = require("./commands/" + group + "/" + cmd).command
    cmds.push(i)
  })
})

const {
  log,
  error,
  captcha
} = require("./utils.js") 

// Log incoming messages
require("./bin/log")(updates, memoryStorage, talkedRecently, cmds)

// Count them
require("./bin/counter")(updates, api, randomStorage)

// Add coins
require("./bin/coins")(updates)

// Check if user mentioned bot
require("./bin/mention")(updates)

// Find n-word
require("./bin/nWord")(updates)

// Check for prefix
require("./bin/prefixCheck")(updates)

// Run command
require("./bin/command")(updates, api, randomStorage, cmds, vk)

// Auto send messages
require("./bin/auto")(api, vk)

// Auto accept friend requests
require("./bin/friends")(api)

/**
 * Starts polling
 */
async function run() {
  await vk.updates.startPolling()
  console.log("> [LOG] Polling started")
}

// Run
run().catch(e => {
  if (e.code == 100) return console.log("> [WARN] Api Error: 100")
  error(e)
})

// Handle captcha
vk.captchaHandler = async ({
  src
}) => {
  captcha("> [LOG] Needed captcha: " + src)
}

////////////// WEB //////////////

const express = require("express")
const ejs = require("ejs")
const crypto = require("crypto")
const bodyParser = require("body-parser").json()
const app = express()

// Lib for command line
const cmd = require("node-cmd")

app.use(express.static("public"))
app.use(bodyParser)

// Git webhooks
app.post("/git", (req, res) => {
  let hmac = crypto.createHmac("sha1", SECRET)
  let sig = "sha1=" + hmac.update(JSON.stringify(req.body)).digest("hex")

  // If event is "push" and secret matches config.SECRET
  if (req.headers["x-github-event"] == "push" && sig == req.headers["x-hub-signature"]) {

    cmd.run("chmod 777 git.sh") // :/ Fix no perms after updating
    cmd.get("./git.sh", (err, data) => {
      if (data) log(data)
      if (err) log(err)
    })

    let commits = req.body.head_commit.message.split("\n").length == 1 ?
      req.body.head_commit.message :
      req.body.head_commit.message.split("\n").map((el, i) => i !== 0 ? "                       " + el : el).join("\n")
    console.log("> [GIT] Updated with origin/master\n" +
      `        Latest commit: ${commits}`)

    cmd.get("refresh", (err) => {
      if (err) error(err)
    })

    return res.sendStatus(200)

  } else return res.sendStatus(400)
})

// Home
app.get("/", (req, res) => {
  ejs.renderFile(__dirname + "/views/index.html", {
    "commands": cmds
  }, (err, str) => {
    if (!err)
      return res.send(str)
    else
      error("On rendering page: " + err),
      res.json({
        "code": 500,
        "message": "Internal error on rendering page"
      })
  })
})

app.get("/cmdList", (req, res) => {
  return res.send(cmds)
})

const listener = app.listen(4000, () => {
  console.log("> [WEB] Started on port " + listener.address().port)
})
const { randomArray } = require("../utils");
const fs = require("fs");
const no = JSON.parse(fs.readFileSync("./no.json", "utf8"));

exports.run = async (api, update, args) => {
  
  async function getMsg() {
    var Dialogs = await api.messages.getConversations({ count: 200 });
    var Dialog  = randomArray(Dialogs.items);
    
    while (no[Dialog.conversation.peer.id]) {
      Dialog = randomArray(Dialog.items);
    }
    
    var Photos = await api.messages.getHistoryAttachments({ peer_id: Dialog.conversation.peer.id, count: 200, media_type: "photo" });
    var Photo = randomArray(Photos.items);
    
    return Photo;
  }
  
  let ph = await getMsg();
  
  while (!ph) {
    ph = await getMsg();
  }
  
  var access = ph.attachment.photo.access_key ? "_" + ph.attachment.photo.access_key : "";
  
  await update.send("", { "attachment": `photo${ph.attachment.photo.owner_id}_${ph.attachment.photo.id}${access}` })
  
}

exports.command = {
  "name": "photo",
  "arguments": false,
  "description": {
    "en": "Sends random photo from other multidialogs",
    "ru": "Отправить рандомное фото из других бесед"
  }
}
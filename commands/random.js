const { randomArray } = require('../utils.js');
const fs = require("fs");
const no = JSON.parse(fs.readFileSync("./no.json", "utf8"));

exports.run = async (api, bot, args) => {
  
  async function getMsg() {
    var Dialogs = await api.messages.getConversations({ count: 200 });
    var Dialog  = randomArray(Dialogs.items);
    
    while (no[Dialog.conversation.peer.id]) {
      Dialog = randomArray(Dialog.items);
    }
    
    var Messages = await api.messages.getHistory({ peer_id: Dialog.conversation.peer.id });
    var Message = randomArray(Messages.items);
    
    return Message;
  }
  
  var res;
  var options = {};
  
  var msg = await getMsg();
  
  while (
    (msg.attachments.length === 0 && 
     msg.text === "") || 
     msg.text.split(" ").some(t => t.startsWith("http")) || 
     msg.text.startsWith("/") || 
     msg.text.length > 500
  ) {
    msg = await getMsg();
  }
  
  if (msg.text !== "") 
    res = msg.text;
  else 
    res = "";
  if (msg.attachments.length !== 0) 
    attachments(msg.attachments);
  
  await bot.send(res, options);
  
  function attachments(arr) {
    arr.forEach(async (attachment, i) => {
    
      if (attachment.type === "photo") {
        var access = attachment.photo.access_key ? 
            "_" + attachment.photo.access_key : "";
        options.attachment = `photo${attachment.photo.owner_id}_${attachment.photo.id}${access}`;
      }
      else if (attachment.type === "sticker")
        return await bot.sendSticker(attachment.sticker.sticker_id);
      else if (attachment.type === "audio_message")
        return await bot.sendAudioMessage(attachment.audio_message.link_ogg);
      else if (attachment.type === "video") {
        var access = attachment.video.access_key ? 
            "_" + attachment.video.access_key : "";
        options.attachment = `video${attachment.video.owner_id}_${attachment.video.id}${access}`;
      }
      
    });
  }
  
}
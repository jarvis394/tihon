const { randomArray } = require("../utils");

exports.run = async (api, update, args) => {
  
  async function getMsg() {
    var Dialogs = await api.messages.getConversations({ count: 200 });
    var Dialog  = randomArray(Dialogs.items);
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
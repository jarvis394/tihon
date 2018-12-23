const { randomArray } = require("../utils");

exports.run = async (api, update, args) => {
  
  async function getMsg() {
    var Dialogs = await api.messages.getConversations({ count: 200 });
    var Dialog  = randomArray(Dialogs.items);
    var Videos = await api.messages.getHistoryAttachments({ peer_id: Dialog.conversation.peer.id, count: 200, media_type: "video" });
    var Video = randomArray(Videos.items);
    
    return Video;
  }
  
  let video = await getMsg();
  
  while (!video) {
    video = await getMsg();
  }
  
  video = video.attachment.video;
  
  var access = video.access_key ? "_" + video.access_key : "";
  
  await update.send("", { "attachment": `video${video.owner_id}_${video.id}${access}` });
  
}
const fs = require("fs");
const no = JSON.parse(fs.readFileSync("./no.json", "utf8"));

module.exports = (api, random, randomArray, blacklist, vk) => {

setInterval(async () => {

  var Dialogs = await api.messages.getConversations({
    count: 200
  });
  var d = [];
  
  Dialogs.items.forEach(async (dialog) => {

    if (blacklist[dialog.conversation.peer.id]) return;
    
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

    var res = "Произошла ошибочка. Я из села :(";
    var options = {};

    var msg = await getMsg();

    while ((msg.attachments.length === 0 && msg.text === "") || msg.text.split(" ").some(t => t.startsWith("http")) || msg.text.startsWith("/") || msg.text.length > 500) {
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

}
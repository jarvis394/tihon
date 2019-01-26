const fs = require("fs");
const no = JSON.parse(fs.readFileSync("./no.json", "utf8"))
const blacklist = JSON.parse(fs.readFileSync("./blacklist.json", "utf8"));
const {
  random,
  randomMessage
} = require("../utils");

module.exports = (api, vk) => {

  setInterval(async () => {

    var Dialogs = await api.messages.getConversations({
      count: 200
    });

    Dialogs.items.forEach(async (dialog) => {

      // If dialog is blacklisted then return
      if (blacklist[dialog.conversation.peer.id]) return;

      var res = "";
      var options = {};

      var msg = randomMessage(api);

      if (msg.text !== "")
        res = msg.text;
      if (msg.attachments.length !== 0) {
        msg.attachments.forEach(attachment => {
          if (attachment.type === "photo") {
            var access = attachment.photo.access_key ? "_" + attachment.photo.access_key : "";
            options.attachments += options.attachments ? 
              "photo" + attachment.photo.owner_id + "_" + attachment.photo.id + access :
              ", photo" + attachment.photo.owner_id + "_" + attachment.photo.id + access
          }
        });
      }

      setTimeout(() => {
        if (options.attachments)
          vk.api.messages.send({
            "message": res,
            "attachment": options.attachments,
            "peer_id": dialog.conversation.peer.id
          })
        else
          vk.api.messages.send({
            "message": res,
            "peer_id": dialog.conversation.peer.id
          });
      }, random(1000, 100 * 1000))

    });

    console.log("> [AUTO] SENT");

  }, 3600 * 1000);

}
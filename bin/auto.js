const DBDialog = require("../lib/DBDialog")
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

      const Dialog = new DBDialog(dialog.conversation.peer.id)
      const data = await Dialog.checkData()

      // If dialog is blacklisted then return
      if (!data.auto) return;

      var res = "";
      var options = {};

      var msg = await randomMessage(api);

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
        else if (res !== "")
          vk.api.messages.send({
            "message": res,
            "peer_id": dialog.conversation.peer.id
          });
        else return
      }, random(1000, 100 * 1000))

    });

    console.log("> [LOG] Auto has been sent");

  }, 3600 * 1000);

}
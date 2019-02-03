const { handleError } = require("../utils")

const {
  randomArray,
  randomMessage
} = require("../utils");
const fs = require("fs");
const no = JSON.parse(fs.readFileSync("./no.json", "utf8"));

exports.run = async (api, update, args) => {
  try {

    // Get dialogs
    var Dialogs = await api.messages.getConversations({
      count: 200
    });

    async function getMsg() {
      var Dialog = randomArray(Dialogs.items);

      while (no[Dialog.conversation.peer.id]) {
        Dialog = randomArray(Dialog.items);
      }

      var Videos = await api.messages.getHistoryAttachments({
        peer_id: Dialog.conversation.peer.id,
        count: 200,
        media_type: "video"
      });
      var Video = randomArray(Videos.items);

      return Video;
    }

    let video = await getMsg();

    while (!video) {
      video = await getMsg();
    }

    video = video.attachment.video;

    var access = video.access_key ? "_" + video.access_key : "";

    await update.send("", {
      "attachment": `video${video.owner_id}_${video.id}${access}`
    });

  } catch (e) {
    handleError(update, e)
  }
}

exports.command = {
  "name": "video",
  "arguments": false,
  "description": {
    "en": "Sends random video from other multidialogs",
    "ru": "Отправить рандомное видео из других бесед"
  }
}
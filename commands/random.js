const { handleError } = require("../utils")

const {
  randomMessage
} = require('../utils.js');
const fs = require("fs");
const no = JSON.parse(fs.readFileSync("./no.json", "utf8"));

exports.run = async (api, update, args) => {
  try {
    var res;
    var options = {};

    var msg = await randomMessage(api);

    if (msg.text !== "")
      res = msg.text;
    else
      res = "";
    if (msg.attachments.length !== 0)
      attachments(msg.attachments);

    await update.send(res, options);

    function attachments(arr) {
      arr.forEach(async (attachment, i) => {

        if (attachment.type === "photo") {
          var access = attachment.photo.access_key ?
            "_" + attachment.photo.access_key : "";
          options.attachment = `photo${attachment.photo.owner_id}_${attachment.photo.id}${access}`;
        } else if (attachment.type === "sticker")
          return await update.sendSticker(attachment.sticker.sticker_id);
        else if (attachment.type === "audio_message")
          return await update.sendAudioMessage(attachment.audio_message.link_ogg);
        else if (attachment.type === "video") {
          var access = attachment.video.access_key ?
            "_" + attachment.video.access_key : "";
          options.attachment = `video${attachment.video.owner_id}_${attachment.video.id}${access}`;
        }

      });
    }

  } catch (e) {
    handleError(update, e)
  }
}

exports.command = {
  "name": "random",
  "arguments": false,
  "description": {
    "en": "Sends random message from other multidialogs",
    "ru": "Отправить рандомное сообщение из других бесед"
  }
}
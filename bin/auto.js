const DBDialog = require("../lib/DBDialog")
const {
  random,
  randomMessage
} = require("../utils")
const { interval } = require("../config")

module.exports = async (api, vk) => {

  /*setInterval(async () => {

    let Dialogs = await api.messages.getConversations({
      count: 200
    })

    Dialogs.items.forEach(async (dialog) => {

      const Dialog = new DBDialog(dialog.conversation.peer.id)
      const data = await Dialog.checkData()

      // If dialog is blacklisted then return
      if (!data.auto) return

      var res = ""
      var options = {}

      var msg = await randomMessage(api)

      if (msg.text !== "")
        res = msg.text
      if (msg.attachments.length !== 0) {
        msg.attachments.forEach(attachment => {
          if (attachment.type === "photo") {
            var access = attachment.photo.access_key ? "_" + attachment.photo.access_key : ""
            options.attachments += options.attachments ? 
              "photo" + attachment.photo.owner_id + "_" + attachment.photo.id + access :
              ", photo" + attachment.photo.owner_id + "_" + attachment.photo.id + access
          }
        })
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
          })
        else return
      }, random(1, 100) * 1000)

    })

    console.log("> [LOG] Auto has been sent")

  }, 3600 * 1000)*/
  
  setInterval(async () => {
  
  let Dialogs = await api.messages.getConversations({ count: 200 })
  let dialogs = Dialogs.items
  let count = Dialogs.count
  let offset = 200
  
  while (offset < count) {
    let offsetDialogs = await api.messages.getConversations({
      count: 200,
      offset: offset
    })
    offsetDialogs.items.forEach(d => dialogs.push(d))
    
    offset += 200
  }
  
  dialogs.forEach(dialog => messageService(dialog))

  }, interval)
    
  /**
   * Installs service for a dialog to auto send messages
   * @param {Object} dialog Dialog object
   */
  async function messageService(dialog) {
    
    const Dialog = new DBDialog(dialog.conversation.peer.id)
    const data = await Dialog.checkData()

    // If dialog is blacklisted then return
    if (!data.auto) return
      
    // If bot was kicked from dialog then return
    if (!dialog.conversation.can_write.allowed) return
    
    setInterval(async () => {
      
      var res = ""
      var options = {}

      var msg = await randomMessage(api)

      if (msg.text !== "") {
        res = msg.text
      }
      
      if (msg.attachments.length !== 0) {
        msg.attachments.forEach(attachment => {
          let { type } = attachment
          let { owner_id, id } = attachment[type]
          let access = attachment[type].access_key ? "_" + attachment[type].access_key : ""
          
          options.attachments += options.attachments ? ", " : ""
          options.attachments += type + owner_id + "_" + id + access
        })
      }
      
      // If some attachments
      if (options.attachments) {
        return vk.api.messages.send({
          "message": res,
          "attachment": options.attachments,
          "peer_id": dialog.conversation.peer.id
        })
      }
      
      // If no attachment and there is a texf
      else if (res !== "") {
        return vk.api.messages.send({
          "message": res,
          "peer_id": dialog.conversation.peer.id
        })
      }
      
      // Fuck this message in any other situation
      else return
      
    }, random(0, 60) * 1000)
  }
}
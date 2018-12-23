exports.run = (api, update, args) => {
  if (args.length === 0) return update.send("Ссылки нема")
  
  api.messages.joinChatByInviteLink({link: args.join("")})
}
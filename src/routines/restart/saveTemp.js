const fs = require('mz/fs')
const { users: usersStore, guildsStore, log } = require('../../globals')

const run = () => {
  let res = {}
  usersStore.forEach((data, id) => (res[id] = data))

  fs.writeFile('temp/coinsData.json', JSON.stringify(res), err => {
    if (err) {
      log.error(err)
    } else {
      log.success('Saved temp data for users', {
        private: true,
      })

      let resGuilds = {}
      guildsStore.forEach((data, id) => (resGuilds[id] = data))

      fs.writeFile('temp/guildsData.json', JSON.stringify(resGuilds), e => {
        if (e) {
          log.error(e)
        } else {
          log.success('Saved temp data for guilds\n\n\n', {
            private: true,
          })
          return process.exit(0)
        }
      })
    }
  })
}

process.on('SIGTERM', () => run())
process.on('SIGINT', () => run())

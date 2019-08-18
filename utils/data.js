const fs = require('mz/fs')

/**
 * Returns dialogs list 
 */
const getDialogs = async () => {
  const data = await fs.readFile('temp/dialogs.json')
  return JSON.parse(data).items
}

/**
 * Returns histories list 
 */
const getHistories = async () => {
  const data = await fs.readFile('temp/messages.json')
  return JSON.parse(data).response
}

module.exports = {
  getDialogs,
  getHistories
}
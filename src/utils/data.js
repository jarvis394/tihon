// const fs = require('mz/fs')

/**
 * Returns dialogs list
 */
const getDialogs = async () => {
  const data = require('../../temp/dialogs.json')
  return data.items
}

/**
 * Returns histories list
 */
const getHistories = () => {
  const data = require('../../temp/messages.json')
  return data.response
}

module.exports = {
  getDialogs,
  getHistories,
}

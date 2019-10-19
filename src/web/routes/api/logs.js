const express = require('express')
const path = require('path')
const logsPath = path.resolve(process.cwd(), 'logs')
const router = express.Router()
const readline = require('reverse-line-reader')

const getLogs = ({ filename, count = 200, offset = 0 }) =>
  new Promise(resolve => {
    let logs = []
    let c = 0

    readline.eachLine(`${logsPath}${path.sep}${filename}.log`, line => {
      if (c >= offset && line) logs.push(line)
      if (logs.length >= count) {
        resolve({
          data: logs,
        })

        // Stop reading
        return false
      }

      c++
    })
  })

router.get('/:filename', async (req, res) => {
  const { count, offset } = req.query
  const { filename } = req.params

  return await res.json(
    getLogs({
      filename,
      count,
      offset,
    })
  )
})

module.exports = router

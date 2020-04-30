const fs = require('fs')
const path = require('path')

const dbFile = 'db.json'
var data = JSON.parse(fs.readFileSync(path.resolve(__dirname, dbFile)))

const tag = {
  getTags: function (fileName) {
    if (data != null) {
      for (const d of data) {
        if (d.name === fileName) {
          return d.tags
        }
      }
    }
    return []
  },
}

module.exports = tag

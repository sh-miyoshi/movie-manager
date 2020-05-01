import fs from 'fs'
import glob from 'glob'

const tagsDBFile = 'db/tags.json'
const filesDBFile = 'db/files.json'


var tagsData = JSON.parse(fs.readFileSync(tagsDBFile))
var filesData = JSON.parse(fs.readFileSync(filesDBFile))

export function getVideoFiles() {
  if (filesData != null) {
    const res = []
    for (const file of filesData) {
      const allList = glob.sync(file)
      for (const item of allList) {
        const stats = fs.statSync(item)
        if (stats.isFile()) {
          res.push(item)
        }
      }
    }
    return res
  }
  return []
}

export function getTags(fileName) {
  if (tagsData != null) {
    for (const data of tagsData) {
      if (data.name === fileName) {
        return data.tags
      }
    }
  }
  return []
}

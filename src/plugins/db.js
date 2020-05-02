import fs from 'fs'
import glob from 'glob'

const tagsDBFile = 'db/tags.json'
const filesDBFile = 'db/files.json'
const selectDBFile = 'db/selects.json'


var tagsData = JSON.parse(fs.readFileSync(tagsDBFile))
var filesData = JSON.parse(fs.readFileSync(filesDBFile))
var selectsData = JSON.parse(fs.readFileSync(selectDBFile))

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

export function getFilteredVideoFiles() {
  const files = getVideoFiles()
  if (selectsData == null || selectsData.length < 1) {
    return files
  }
  if (tagsData == null) {
    return []
  }

  const res = []
  for (const f of files) {
    let ok = false
    const tags = getTags(f)
    for (const t of tags) {
      if (selectsData.includes(t)) {
        ok = true
        break
      }
    }
    if (ok) {
      res.push(f)
    }
  }

  return res
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

export function getAllTag() {
  if (tagsData != null) {
    const tags = []
    for (const data of tagsData) {
      for (const t of data.tags) {
        tags.push(t)
      }
    }
    return Array.from(new Set(tags))
  }
  return []
}

export function removeTag(fileName, targetTag) {
  if (tagsData == null) {
    return
  }

  for (let data of tagsData) {
    if (data.name === fileName) {
      const tags = data.tags.filter(t => t !== targetTag)
      data.tags = tags
      break
    }
  }

  fs.writeFileSync(tagsDBFile, JSON.stringify(tagsData, null, 4))
}
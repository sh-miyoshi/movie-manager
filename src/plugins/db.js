import fs from 'fs'
import path from 'path'

const tagsDBFile = 'db/tags.json'
const filesDBFile = 'db/files.json'
const selectDBFile = 'db/selects.json'


var tagsData = JSON.parse(fs.readFileSync(tagsDBFile))
var filesData = JSON.parse(fs.readFileSync(filesDBFile))
var selectsData = JSON.parse(fs.readFileSync(selectDBFile))

function getFiles(dirPath, val) {
  const target = path.join(dirPath, val)
  const stats = fs.statSync(target)
  if (stats.isFile()) {
    return [target]
  } else if (stats.isDirectory()) {
    let res = []
    const allDirents = fs.readdirSync(target, { withFileTypes: true })
    for (const dirent of allDirents) {
      if (dirent.isFile()) {
        res.push(path.join(target, dirent.name))
      } else if (dirent.isDirectory()) {
        res = res.concat(getFiles(target, dirent.name))
      }
    }
    return res
  }
  return []
}

export function addOpenFileOrDirectoryList(pathList) {
  if (filesData == null) {
    filesData = pathList.concat()
  }

  for (const path of pathList) {
    if (!filesData.includes(path)) {
      filesData.push(path)
    }
  }

  // save filesData
  fs.writeFileSync(filesDBFile, JSON.stringify(filesData, null, 4))
}

export function getAllVideoFiles() {
  if (filesData != null) {
    let res = []
    for (const data of filesData) {
      const files = getFiles("", data)
      res = res.concat(files)
    }
    console.log('all files: %o', res)
    return res
  }
  return []
}

export function getFilteredVideoFiles() {
  const files = getAllVideoFiles()
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
      if (path.normalize(data.name) === path.normalize(fileName)) {
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

export function addTag(fileName, tag) {
  if (tagsData == null) {
    return
  }

  for (const data of tagsData) {
    if (data.name === fileName) {
      if (!data.tags.includes(tag)) {
        data.tags.push(tag)
      }
      break
    }
  }

  fs.writeFileSync(tagsDBFile, JSON.stringify(tagsData, null, 4))
}
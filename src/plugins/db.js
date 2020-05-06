import fs from 'fs'
import path from 'path'

const tagsDBFile = 'db/tags.json'
const filesDBFile = 'db/files.json'
const selectsDBFile = 'db/selects.json'


var tagsData = JSON.parse(fs.readFileSync(tagsDBFile))
var filesData = JSON.parse(fs.readFileSync(filesDBFile))
var selectsData = JSON.parse(fs.readFileSync(selectsDBFile))

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

  console.log("Open Directory List: %o", filesData)

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
    let ok = true
    const tags = getTags(f)
    for (const t of selectsData) {
      if (!tags.includes(t)) {
        ok = false
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
  console.log("removing a tag %s from %s", targetTag, fileName)

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
  console.log("adding a tag %s from %s", tag, fileName)

  if (tagsData == null) {
    return
  }

  let found = false
  for (const data of tagsData) {
    if (data.name === fileName) {
      found = true
      if (!data.tags.includes(tag)) {
        data.tags.push(tag)
      }
      break
    }
  }

  if (!found) {
    tagsData.push({
      name: fileName,
      tags: [tag]
    })
  }

  fs.writeFileSync(tagsDBFile, JSON.stringify(tagsData, null, 4))
}

export function getSelectTags() {
  if (selectsData == null) {
    return []
  }
  return selectsData
}

export function setSelectTags(tags) {
  console.log("filter tag list: %o", tags)
  selectsData = tags
  fs.writeFileSync(selectsDBFile, JSON.stringify(selectsData, null, 4))
}

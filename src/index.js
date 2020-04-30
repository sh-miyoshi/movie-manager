const electron = require('electron');
const fs = require('fs');
const path = require('path');
const remote = electron.remote;
const fileUtil = remote.require('./fileUtil');
const tag = remote.require('./tag')

fileUtil.getFileList('tmp/**', function (err, matches) {
  if (err) {
    console.log('Failed to get file list: %o', err)
    return
  }

  let res = ""
  for (const v of matches) {
    const stats = fs.statSync(v)
    if (stats.isFile()) {
      const tags = tag.getTags(v)
      let tagStr = ""
      for (t of tags) {
        tagStr += `
<div>
  ${t}
  <button>x</button>
</div>
`
      }

      res += `
<div>
Title: ${v}<br/>
Tags: ${tagStr}<br/>
<video controls width="300px" src="${path.join(__dirname, "../", v)}"></video>
</div>
`
    }
  }

  document.getElementById("movie_list").innerHTML = res
});
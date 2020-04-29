const electron = require('electron');
const remote = electron.remote;
const fileUtil = remote.require('./fileUtil');
const fs = require('fs');
const path = require('path');

fileUtil.getFileList('tmp/**', function (err, matches) {
  if (err) {
    console.log('Failed to get file list: %o', err)
    return
  }

  let res = ""
  for (const v of matches) {
    const stats = fs.statSync(v)
    if (stats.isFile()) {
      res += "<video controls src=\"" + path.join(__dirname, "../", v) + "\"></video>"
    }
  }

  document.getElementById("movie_list").innerHTML = res
});
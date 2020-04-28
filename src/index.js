const electron = require('electron');
const remote = electron.remote;
const fileUtil = remote.require('./fileUtil');
const fs = require('fs');

fileUtil.getFileList('tmp/**', function (err, matches) {
  if (err) {
    console.log('Failed to get file list: %o', err)
    return
  }

  const files = new Array()
  for (const v of matches) {
    const stats = fs.statSync(v)
    if (stats.isFile()) {
      files.push(v)
    }
  }

  document.getElementById("movie_list").innerHTML = files.join()
});
const electron = require('electron');
const remote = electron.remote;
const fileUtil = remote.require('./fileUtil');

fileUtil.fetchReadmeList('tmp/**', function (err, matches) {
  if (!err) document.write(matches.join());
});
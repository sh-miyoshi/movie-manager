const glob = require('glob');

const fileUtil = {
  fetchReadmeList: function (dir, callback) {
    glob(dir, function (err, matches) {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, matches);
    });
  }
};

module.exports = fileUtil;
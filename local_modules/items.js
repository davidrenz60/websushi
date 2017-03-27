var path = require('path');
var fs = require('fs');

var Items = {
  file_path: path.resolve(path.dirname(__dirname), 'data/items.json'),

  get: function() {
    return JSON.parse(fs.readFileSync(this.file_path, 'utf-8'));
  },
};

module.exports = Items;
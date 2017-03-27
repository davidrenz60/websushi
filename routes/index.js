var path = require('path');
var Items = require(path.resolve(path.dirname(__dirname), 'local_modules/items.js'));

module.exports = function(router) {
  router.get('/', function(req, res) {
    res.render('index', {
      items: Items.get(),
    });
  });
};
var hello = require('../controllers/hello.server.controller');

module.exports = function(app) {
  app.get('/hello', hello.get);
}

var loginController = require('../controllers/login.server.controller');

module.exports = function(app) {
  app.post('/login', loginController.login);
}

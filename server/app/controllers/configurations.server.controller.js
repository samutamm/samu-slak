var devJson = require('../../config/dev-conf.json')
    prodJson = require('../../config/prod-conf.json');

exports.send = function(req, res) {
  if (process.env.NODE_ENV === 'development') {
    res.send(devJson);
  } else {
    res.send(prodJson);
  }
}

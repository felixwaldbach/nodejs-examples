var express = require('express');
var router = express.Router();

var qr = require('qr-image')

/* GET home page. */
router.get('/', function(req, res, next) {
  var code = qr.image('http://192.168.2.104:5000', { type: 'svg' });
  res.type('svg');
  code.pipe(res);
});

module.exports = router;

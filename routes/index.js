const cookieParser = require('cookie-parser');
var express = require('express');
var router = express.Router();
const { testPassword } = require('../functions/index')



/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/password', function (req, res, next) {
  let { crackTime, advices } = testPassword(req.body.password)
  res.status(200).json({
    'result': crackTime.time * 1000,
    'quantum': (crackTime.time * 1000) / 2000000,
    advices
  });
  next();
});

module.exports = router;

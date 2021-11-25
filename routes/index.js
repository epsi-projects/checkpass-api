const cookieParser = require('cookie-parser');
var express = require('express');
var router = express.Router();
const { testPassword } = require('../functions/index')



/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/password', function (req, res) {
  console.log('req.body.password', req.body.password)
  let { crackTime, advices } = testPassword(req.body.password)
  return res.status(200).json({
    'computer': crackTime.time / 60,
    'quantum': (crackTime.time / 60) / 2000000,
    advices
  });
});

module.exports = router;

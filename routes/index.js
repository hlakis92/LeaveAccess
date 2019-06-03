var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'LAM' });
});

router.get('/index', function(req, res, next) {
  // res.send('respond with a resource');
  res.render('index', { title: 'LAM' });
});

module.exports = router;

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.status(200);
  res.render('login', {title: 'LAM'});
});

router.get('/dashboard', function (req, res, next) {
  // res.send('respond with a resource');
  res.status(200);
  res.render('pages/employee', {title: 'LAM'});
});

router.get('/search', function (req, res, next) {
  // res.send('respond with a resource');
  res.status(200);
  res.render('pages/search', {title: 'LAM'});
});

router.get('/location', function (req, res, next) {
  // res.send('respond with a resource');
  res.status(200);
  res.render('pages/location', {title: 'LAM'});
});

router.get('/leavereason', function (req, res, next) {
  res.status(200);
  res.render('pages/leavereason', {title: 'LAM'});
});

router.get('/leaveprovider', function (req, res, next) {
  res.status(200);
  let type = req.query.type || 1;
  res.render('pages/leaveprovider', {title: 'LAM', type: type});
});

router.get('/leavetype', function (req, res, next) {
  res.status(200);
  res.render('pages/leavetype', {title: 'LAM'});
});

router.get('/leaveeligibility', function (req, res, next) {
  res.status(200);

  res.render('pages/leaveeligibility', {title: 'LAM'});
});
module.exports = router;

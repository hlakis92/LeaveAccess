var express = require('express');
var router = express.Router();
let middleware = require('./../server/middleware');


router.get('/task', middleware.checkAccessToken, function (req, res, next) {
  // res.send('respond with a resource');
  res.status(200);
  res.render('task/list', {title: 'Task List'});
});


// SHOW ADD USER FORM
module.exports = router;

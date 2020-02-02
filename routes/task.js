var express = require('express');
var router = express.Router();


router.get('/task', function (req, res, next) {
  // res.send('respond with a resource');
  res.status(200);
  res.render('task/list', {title: 'Task List'});
});


// SHOW ADD USER FORM
module.exports = router;

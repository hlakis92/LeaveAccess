var express = require('express');
var router = express.Router();
let middleware = require('./../server/middleware');
const taskDAL = require("../server/api/task/task.DAL");
const userService = require("../server/api/user/user.service");


router.get('/task', middleware.checkAccessToken, function (req, res, next) {
  // res.send('respond with a resource');
  res.status(200);
  res.render('task/list', {title: 'Task List'});
});

router.get('/task/edit/:taskId', middleware.checkAccessToken, async (req, res, next) => {
  // res.send('respond with a resource');
  res.status(200);
  let taskDetails = await taskDAL.getTaskDetailById(req.params.taskId);
  let getManager = await userService.getManagerService(req);
  let getManagerData = getManager.data;
  console.log(taskDetails)
  let data = Object.assign({
    title: 'Task Edit',
    user_id: req.session.userInfo.userId,
    usertype: req.session.userInfo.usertype,
    getManagerData: getManagerData,
  }, taskDetails.content[0]);

  // console.log(taskDetails)
  res.render('task/edit', data);
});


// SHOW ADD USER FORM
module.exports = router;

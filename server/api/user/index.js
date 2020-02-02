let express = require('express');
let controller = require('./user.controller');
let middleware = require('../../middleware');

let router = express.Router();
module.exports = router;

router.post('/user-signup', controller.signup);
router.post('/user-signin', controller.signin);
router.post('/logout', controller.logout);


router.get('/users', middleware.checkAccessToken, controller.users);
router.post('/deleteuser', middleware.checkAccessToken, controller.deleteuser);
router.post('/adduser', middleware.checkAccessToken, controller.adduser);
router.post('/updateuser', middleware.checkAccessToken, controller.updateuser);
//router.post('/add-all-data', controller.addAllData);
//router.get('/get-employee-leave-summary/:empId', controller.getEmployeeLeaveSummary);
//router.get('/get-employee-leave-claim-info/:claimNumber', controller.getEmployeeLeaveClaimInfo);
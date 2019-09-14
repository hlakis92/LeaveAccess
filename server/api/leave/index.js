let express = require('express');
let controller = require('./leave.controller');
let middleware = require('../../middleware');

let router = express.Router();
module.exports = router;

// router.post('/add-employee', controller.addEmployee);
router.post('/check-leave-eligibility', controller.checkLeaveEligibility);
router.post('/add-all-data', controller.addAllData);
router.get('/get-employee-leave', controller.getEmployeeLeave);




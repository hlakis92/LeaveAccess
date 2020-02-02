let express = require('express');
let controller = require('./leave.controller');
let middleware = require('../../middleware');

let router = express.Router();
module.exports = router;

// router.post('/add-employee', controller.addEmployee);
router.post('/check-leave-eligibility', controller.checkLeaveEligibility);
router.post('/add-all-data', controller.addAllData);
router.get('/get-employee-leave', controller.getEmployeeLeave);
router.get('/get-employee-leave-summary/:empId', controller.getEmployeeLeaveSummary);
router.get('/get-employee-leave-claim-info/:claimNumber', controller.getEmployeeLeaveClaimInfo);
router.post('/edit-leave-decision', controller.editLeaveDecision);
router.post('/sync-data', controller.syncData);




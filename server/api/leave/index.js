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
router.post('/add-leave-determination-decision', controller.addLeaveDeterminationDecision);
router.post('/sync-data', controller.syncData);
router.post('/return-to-work-confirmation', controller.returnToWorkConfirmation);
router.post('/paper-work-review', controller.paperWorkReview);
router.post('/intermittent-parameter', controller.intermittentParameter);
router.post('/intermittent-time', controller.intermittentTime);
router.get('/get-intermittent-time/:leaveInfoId/:date', controller.getIntermittentTime);




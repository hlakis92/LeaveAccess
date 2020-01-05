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
  res.render('pages/searchleave', {title: 'LAM'});
});
router.get('/employee', function (req, res, next) {
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
  console.log("......................render.....", req.co);

  res.render('pages/leaveeligibility', {title: 'LAM'});
});
router.get('/d', function (req, res, next) {
  // res.send('respond with a resource');
  res.status(200);
  res.render('pages/dashboard', {title: 'LAM'});
});

router.get('/searchemployee', function (req, res, next) {
  // res.send('respond with a resource');
  res.status(200);
  res.render('pages/searchemployee', {title: 'searchemployee'});
});

router.get('/leavelist', function (req, res, next) {
  // res.send('respond with a resource');
  res.status(200);
  res.render('pages/leavelist', {title: 'leavelist'});
});

router.get('/leavesummary/:empId', async function (req, res, next) {
  // res.send('respond with a resource');
  res.status(200);
  let empId = req.params.empId;
  let leaveService = require('./../server/api/leave/leave.service');
  let employeeLeaveSummaryResult = await leaveService.getEmployeeLeaveSummaryService(req);
  let common = require('./../server/api/common');
  let leaveTypeDataNestByStatusObject;
  if (employeeLeaveSummaryResult.status === true && employeeLeaveSummaryResult.data.length !== 0) {
    let leaveTypeDataNestByStatus = common.nestingData(employeeLeaveSummaryResult.data, 'status');
    leaveTypeDataNestByStatusObject = common.adjustValueOfKeyValuesPairToObject(leaveTypeDataNestByStatus);

  } else {

  }
  res.render('pages/leavesummary', {
    title: 'leavesummary',
    empId: empId,
    employeeLeaveSummaryData: leaveTypeDataNestByStatusObject,
  });
});

router.get('/claimcontinuous/:claimNumber', async function (req, res, next) {
  let leaveService = require('./../server/api/leave/leave.service');
  let employeeLeaveClaimInfoResult = await leaveService.getEmployeeLeaveClaimInfoService(req);
  // let common = require('./../server/api/common');
  let employeeLeaveClaimInfoData, planMaximumDuration, planStatus;

  if (employeeLeaveClaimInfoResult.status === true) {
    employeeLeaveClaimInfoData = employeeLeaveClaimInfoResult.data.leaveInfo;
    planMaximumDuration = employeeLeaveClaimInfoResult.data.planMaximumDuration;
    planStatus = employeeLeaveClaimInfoResult.data.planStatus

  } else {

  }
  console.log(employeeLeaveClaimInfoData)
  res.render('pages/claimcontinuous', {
    title: 'Leave Overview',
    employeeLeaveClaimInfoData: employeeLeaveClaimInfoData,
    planMaximumDuration: planMaximumDuration,
    planStatus: planStatus,
  });
});

router.get('/claimintermittent/:claimNumber', async function (req, res, next) {
  let leaveService = require('./../server/api/leave/leave.service');
  let employeeLeaveClaimInfoResult = await leaveService.getEmployeeLeaveClaimInfoService(req);
  // let common = require('./../server/api/common');
  let employeeLeaveClaimInfoData, planMaximumDuration, planStatus;

  if (employeeLeaveClaimInfoResult.status === true) {
    employeeLeaveClaimInfoData = employeeLeaveClaimInfoResult.data.leaveInfo;
    planMaximumDuration = employeeLeaveClaimInfoResult.data.planMaximumDuration;
    planStatus = employeeLeaveClaimInfoResult.data.planStatus

  } else {

  }
  res.render('pages/claimintermittent', {
    title: 'Leave Overview',
    employeeLeaveClaimInfoData: employeeLeaveClaimInfoData,
    planMaximumDuration: planMaximumDuration,
    planStatus: planStatus,
  });
});

router.get('/claimreducedschedule/:claimNumber', async function (req, res, next) {
  let leaveService = require('./../server/api/leave/leave.service');
  let employeeLeaveClaimInfoResult = await leaveService.getEmployeeLeaveClaimInfoService(req);
  // let common = require('./../server/api/common');
  let employeeLeaveClaimInfoData, planMaximumDuration, planStatus;

  if (employeeLeaveClaimInfoResult.status === true) {
    employeeLeaveClaimInfoData = employeeLeaveClaimInfoResult.data.leaveInfo;
    planMaximumDuration = employeeLeaveClaimInfoResult.data.planMaximumDuration;
    planStatus = employeeLeaveClaimInfoResult.data.planStatus

  } else {

  }
  res.render('pages/claimreducedschedule', {
    title: 'Leave Overview',
    employeeLeaveClaimInfoData: employeeLeaveClaimInfoData,
    planMaximumDuration: planMaximumDuration,
    planStatus: planStatus,
  });
});

router.get('/decision/:claimNumber', async function (req, res, next) {
  let leaveService = require('./../server/api/leave/leave.service');
  let employeeLeaveClaimInfoResult = await leaveService.getEmployeeLeaveClaimInfoService(req);
  let employeeLeaveClaimInfoData, planMaximumDuration, planStatus;

  if (employeeLeaveClaimInfoResult.status === true) {
    employeeLeaveClaimInfoData = employeeLeaveClaimInfoResult.data.leaveInfo;
    planMaximumDuration = employeeLeaveClaimInfoResult.data.planMaximumDuration;
    planStatus = employeeLeaveClaimInfoResult.data.planStatus

  } else {

  }

  res.render('pages/decision', {
    title: 'Leave Overview',
    employeeLeaveClaimInfoData: employeeLeaveClaimInfoData,
    planMaximumDuration: planMaximumDuration,
    planStatus: planStatus,

  });
});

module.exports = router;


// http://127.0.0.1:3000/cliamintermittent/100001
// http://127.0.0.1:3000/claimintermittent/100001
// http://127.0.0.1:3000/claimintermittent/100001
// http://127.0.0.1:3000/claimintermittent/100001

// http://127.0.0.1:3000/cliamintermittent/100001
// http://127.0.0.1:3000/claimintermittent/100001
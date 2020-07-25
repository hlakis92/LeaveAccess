var express = require('express');
var router = express.Router();
let middleware = require('./../server/middleware');
let common = require('./../server/api/common');

/* GET home page. */
router.get('/', function (req, res, next) {
  let userInfo = req.session.userInfo;
  if (userInfo !== undefined) {
    res.redirect('/searchemployee');
  } else {
    res.status(200);
    res.render('login', {title: 'LAM'});
  }
});

// router.get('/dashboard', function (req, res, next) {
//   // res.send('respond with a resource');
//   res.status(200);
//   res.render('pages/searchleave', {title: 'LAM'});
// });

router.get('/employee', middleware.checkAccessToken, async function (req, res, next) {
  // res.send('respond with a resource');
  res.status(200);
  let empId = req.query.empId;
  if (empId !== undefined) {
    let employeeService = require('./../server/api/employee/employee.service');
    let employeeInfoResult = await employeeService.getEmployeeInfoService(req);
    // let employeeLocationInfoResult = await employeeService.getEmployeeLocationInfoService(req);
    res.render('pages/employee', {
      title: 'LAM',
      employeeInfo: JSON.stringify(employeeInfoResult.data),
    });
  } else {
    res.render('pages/employee', {title: 'LAM', employeeInfo: undefined});
  }
  // res.render('pages/employee', {title: 'LAM'});
});

router.get('/search', middleware.checkAccessToken, function (req, res, next) {
  // res.send('respond with a resource');
  res.status(200);
  res.render('pages/search', {title: 'LAM'});
});

router.get('/location', middleware.checkAccessToken, async function (req, res, next) {
  // res.send('respond with a resource');
  res.status(200);
  let empId = req.query.empId;
  if (empId !== undefined) {
    let employeeService = require('./../server/api/employee/employee.service');
    let employeeInfoResult = await employeeService.getEmployeeInfoService(req);
    let employeeLocationInfoResult = await employeeService.getEmployeeLocationInfoService(req);
    res.render('pages/location', {
      title: 'LAM',
      employeeInfo: JSON.stringify(employeeInfoResult.data),
      employeeLocationInfo: JSON.stringify(employeeLocationInfoResult.data),
    });
  } else {
    res.render('pages/location', {title: 'LAM', employeeInfo: undefined, employeeLocationInfo: undefined});
  }
});

router.get('/leavereason', middleware.checkAccessToken, async function (req, res, next) {
  res.status(200);
  let empId = req.query.empId;
  if (empId !== undefined) {
    let employeeService = require('./../server/api/employee/employee.service');
    let employeeInfoResult = await employeeService.getEmployeeInfoService(req);
    let employeeLocationInfoResult = await employeeService.getEmployeeLocationInfoService(req);
    res.render('pages/leavereason', {
      title: 'LAM',
      employeeInfo: JSON.stringify(employeeInfoResult.data),
      employeeLocationInfo: JSON.stringify(employeeLocationInfoResult.data),
    });
  } else {
    res.render('pages/leavereason', {title: 'LAM', employeeInfo: undefined, employeeLocationInfo: undefined});
  }
});

router.get('/leaveprovider', middleware.checkAccessToken, async (request, response, next) => {
  response.status(200);
  let type = request.query.type || 1;
  let empId = request.query.empId;
  let claimNumber = request.query.claimNumber;
  if (empId !== undefined) {
    let employeeService = require('./../server/api/employee/employee.service');
    let leaveService = require('./../server/api/leave/leave.service');
    let employeeInfoResult = await employeeService.getEmployeeInfoService(request);
    let employeeLocationInfoResult = await employeeService.getEmployeeLocationInfoService(request);
    let employeeLeaveProviderInfoResult = await leaveService.getEmployeeLeaveProviderService(request);
    let type = 1;
    if (employeeLeaveProviderInfoResult.data['leaveReason'] === 'Employees Own Health Condition') {
      type = 0
    }
    response.render('pages/leaveprovider', {
      title: 'LAM',
      type: type,
      employeeInfo: JSON.stringify(employeeInfoResult.data),
      employeeLocationInfo: JSON.stringify(employeeLocationInfoResult.data),
      employeeLeaveProviderInfo: JSON.stringify(employeeLeaveProviderInfoResult.data),
    });
  } else {
    response.render('pages/leaveprovider', {
      title: 'LAM',
      type: type,
      employeeInfo: undefined,
      employeeLocationInfo: undefined,
      employeeLeaveProviderInfo: undefined
    });
  }
});

router.get('/leavetype', function (req, res, next) {
  res.status(200);
  res.render('pages/leavetype', {title: 'LAM'});
});

router.get('/leaveeligibility', middleware.checkAccessToken, async (request, response, next) => {
  response.status(200);
  let type = 1;
  let empId = request.query.empId;
  let claimNumber = request.query.claimNumber;
  if (empId !== undefined) {
    let employeeService = require('./../server/api/employee/employee.service');
    let leaveService = require('./../server/api/leave/leave.service');
    let employeeInfoResult = await employeeService.getEmployeeInfoService(request);
    let employeeLocationInfoResult = await employeeService.getEmployeeLocationInfoService(request);
    let employeeLeaveProviderInfoResult = await leaveService.getEmployeeLeaveProviderService(request);
    // let employeeLeaveTypeInfoResult = await leaveService.getEmployeeLeaveEligibilityService(request);
    let employeeLeaveEligibilityInfoResult = await leaveService.getEmployeeLeaveEligibilityService(request);

    if (employeeLeaveProviderInfoResult.data['leaveReason'] === 'Employees Own Health Condition') {
      type = 0
    }
    // console.log("..............",employeeInfoResult.data['first_name'])
    // console.log("..............*******************************.....",employeeLeaveProviderInfo);
    response.render('pages/leaveeligibility', {
      title: 'LAM',
      type: type,
      employeeInfo: JSON.stringify(employeeInfoResult.data),
      employeeLocationInfo: JSON.stringify(employeeLocationInfoResult.data),
      employeeLeaveProviderInfo: JSON.stringify(employeeLeaveProviderInfoResult.data),
      employeeLeaveEligibilityInfo: JSON.stringify(employeeLeaveEligibilityInfoResult.data),

    });
  } else {
    response.render('pages/leaveeligibility', {
      title: 'LAM',
      type: type,
      employeeInfo: undefined,
      employeeLocationInfo: undefined,
      employeeLeaveProviderInfo: undefined,
      employeeLeaveEligibilityInfo: undefined,
    });
  }
  // res.render('pages/leaveeligibility', {title: 'LAM'});
});

/*router.get('/d', function (req, res, next) {
  // res.send('respond with a resource');
  res.status(200);
  res.render('pages/dashboard', {title: 'LAM'});
});*/

router.get('/searchemployee', middleware.checkAccessToken, function (req, res, next) {
  // res.send('respond with a resource');
  res.status(200);
  res.render('pages/searchemployee', {title: 'searchemployee'});
});

router.get('/leavelist', middleware.checkAccessToken, function (req, res, next) {
  // res.send('respond with a resource');
  res.status(200);
  res.render('pages/leavelist', {title: 'leavelist'});
});

router.get('/leavesummary/:empId', middleware.checkAccessToken, async function (req, res, next) {
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

router.get('/claimcontinuous/:claimNumber', middleware.checkAccessToken, async function (req, res, next) {
  let leaveService = require('./../server/api/leave/leave.service');
  let employeeService = require('./../server/api/employee/employee.service');
  let employeeLeaveClaimInfoResult = await leaveService.getEmployeeLeaveClaimInfoService(req);
  req['query'] = {
    empId: employeeLeaveClaimInfoResult.data.employeeInfo['empId']
  }
  let employeeInfoResult = await employeeService.getEmployeeInfoService(req);
  let employeeLocationInfoResult = await employeeService.getEmployeeLocationInfoService(req);

  //Get Login User Info 
  let userId = req.session.userInfo.userId;

  //Get Manager Data.
  let userService = require('./../server/api/user/user.service');
  let getManager = await userService.getManagerService(req);
  let getManagerData = getManager.data;
  let employeeLeaveClaimInfoData, planMaximumDuration, planStatus, paperWorkReview = [],
    paperWorkReviewDocumentList = [], employeeLeaveInfoData, taskList = [];


  if (employeeLeaveClaimInfoResult.status === true) {
    employeeLeaveInfoData = employeeLeaveClaimInfoResult.data.employeeInfo;
    employeeLeaveClaimInfoData = employeeLeaveClaimInfoResult.data.leaveInfo;
    planMaximumDuration = employeeLeaveClaimInfoResult.data.planMaximumDuration;
    planStatus = employeeLeaveClaimInfoResult.data.planStatus;
    paperWorkReview = employeeLeaveClaimInfoResult.data.paperWorkReview;
    paperWorkReviewDocumentList = employeeLeaveClaimInfoResult.data.paperWorkReviewDocument;
    taskList = employeeLeaveClaimInfoResult.data.taskList;
  } else {
  }
  let paperWorkReviewList = [
    {value: "provider\'s name", text: "Provider\'s Name", isChecked: ""},
    {value: "provider\'s specialty", text: "Provider\'s Specialty", isChecked: ""},
    {value: "serious health condition", text: "Serious Health Condition", isChecked: ""},
    {value: "dates / parameters", text: "Dates / Parameters", isChecked: ""},
    {value: "provider signature", text: "Provider Signature", isChecked: ""},
    {value: "date signed", text: "Date Signed", isChecked: ""},
  ];
  paperWorkReviewList.forEach(data => {
    paperWorkReview.forEach(paperWorkData => {
      if (paperWorkData['paperWorkName'] === data['value'] && paperWorkData['isPaperWorkReview'] == 1) {
        data['isChecked'] = 'checked';
      }
    });
  });
  // console.log("....................",)

  // console.log('..............',req.url)

  res.render('pages/claimcontinuous', {
    title: 'Leave Overview',
    employeeLeaveInfoData: employeeLeaveInfoData,
    employeeLeaveClaimInfoData: employeeLeaveClaimInfoData,
    planMaximumDuration: planMaximumDuration,
    planStatus: planStatus,
    paperWorkReviewList: paperWorkReviewList,
    paperWorkReviewDocumentList: paperWorkReviewDocumentList,
    getManagerData: getManagerData,
    userId: userId,
    employeeInfo: JSON.stringify(employeeInfoResult.data),
    employeeLocationInfo: JSON.stringify(employeeLocationInfoResult.data),
    taskList: taskList,
    callBackURL:req.url
  });
});

router.get('/claimintermittent/:claimNumber', middleware.checkAccessToken, async function (req, res, next) {
  let leaveService = require('./../server/api/leave/leave.service');
  let employeeService = require('./../server/api/employee/employee.service');
  let employeeLeaveClaimInfoResult = await leaveService.getEmployeeLeaveClaimInfoService(req);
  req['query'] = {
    empId: employeeLeaveClaimInfoResult.data.employeeInfo['empId']
  }
  let employeeInfoResult = await employeeService.getEmployeeInfoService(req);
  let employeeLocationInfoResult = await employeeService.getEmployeeLocationInfoService(req);

  //Get Login User Info
  let userId = req.session.userInfo.userId

  let userService = require('./../server/api/user/user.service');
  let getManager = await userService.getManagerService(req);
  let getManagerData = getManager.data;

  // let common = require('./../server/api/common');
  let employeeLeaveClaimInfoData, planMaximumDuration, planStatus, paperWorkReview = [],
    paperWorkReviewDocumentList = [], employeeLeaveInfoData;

  if (employeeLeaveClaimInfoResult.status === true) {
    employeeLeaveInfoData = employeeLeaveClaimInfoResult.data.employeeInfo;
    employeeLeaveClaimInfoData = employeeLeaveClaimInfoResult.data.leaveInfo;
    planMaximumDuration = employeeLeaveClaimInfoResult.data.planMaximumDuration;
    planStatus = employeeLeaveClaimInfoResult.data.planStatus;
    paperWorkReview = employeeLeaveClaimInfoResult.data.paperWorkReview;
    paperWorkReviewDocumentList = employeeLeaveClaimInfoResult.data.paperWorkReviewDocument

  } else {

  }
  let paperWorkReviewList = [
    {value: "provider\'s name", text: "Provider\'s Name", isChecked: ""},
    {value: "provider\'s specialty", text: "Provider\'s Specialty", isChecked: ""},
    {value: "serious health condition", text: "Serious Health Condition", isChecked: ""},
    {value: "dates / parameters", text: "Dates / Parameters", isChecked: ""},
    {value: "provider signature", text: "Provider Signature", isChecked: ""},
    {value: "date signed", text: "Date Signed", isChecked: ""},
  ];
  paperWorkReviewList.forEach(data => {
    paperWorkReview.forEach(paperWorkData => {
      if (paperWorkData['paperWorkName'] === data['value'] && paperWorkData['isPaperWorkReview'] == 1) {
        data['isChecked'] = 'checked';
      }
    });
  });
  res.render('pages/claimintermittent', {
    title: 'Leave Overview',
    employeeLeaveInfoData: employeeLeaveInfoData,
    employeeLeaveClaimInfoData: employeeLeaveClaimInfoData,
    planMaximumDuration: planMaximumDuration,
    planStatus: planStatus,
    paperWorkReviewList: paperWorkReviewList,
    paperWorkReviewDocumentList: paperWorkReviewDocumentList,
    getManagerData: getManagerData,
    userId: userId,
    employeeInfo: JSON.stringify(employeeInfoResult.data),
    employeeLocationInfo: JSON.stringify(employeeLocationInfoResult.data),
  });
});

router.get('/claimreducedschedule/:claimNumber', middleware.checkAccessToken, async function (req, res, next) {
  let leaveService = require('./../server/api/leave/leave.service');
  let employeeService = require('./../server/api/employee/employee.service');
  let employeeLeaveClaimInfoResult = await leaveService.getEmployeeLeaveClaimInfoService(req);
  req['query'] = {
    empId: employeeLeaveClaimInfoResult.data.employeeInfo['empId']
  }
  let employeeInfoResult = await employeeService.getEmployeeInfoService(req);
  let employeeLocationInfoResult = await employeeService.getEmployeeLocationInfoService(req);
  // let common = require('./../server/api/common');

  //Get Login User Info
  let userId = req.session.userInfo.userId;

  let userService = require('./../server/api/user/user.service');
  let getManager = await userService.getManagerService(req);
  let getManagerData = getManager.data;

  let employeeLeaveClaimInfoData, planMaximumDuration, planStatus, paperWorkReview = [],
    paperWorkReviewDocumentList = [], employeeLeaveInfoData;

  if (employeeLeaveClaimInfoResult.status === true) {
    employeeLeaveInfoData = employeeLeaveClaimInfoResult.data.employeeInfo;
    employeeLeaveClaimInfoData = employeeLeaveClaimInfoResult.data.leaveInfo;
    planMaximumDuration = employeeLeaveClaimInfoResult.data.planMaximumDuration;
    planStatus = employeeLeaveClaimInfoResult.data.planStatus;
    planStatus = employeeLeaveClaimInfoResult.data.planStatus;
    paperWorkReview = employeeLeaveClaimInfoResult.data.paperWorkReview;
    paperWorkReviewDocumentList = employeeLeaveClaimInfoResult.data.paperWorkReviewDocument


  } else {

  }
  let paperWorkReviewList = [
    {value: "provider\'s name", text: "Provider\'s Name", isChecked: ""},
    {value: "provider\'s specialty", text: "Provider\'s Specialty", isChecked: ""},
    {value: "serious health condition", text: "Serious Health Condition", isChecked: ""},
    {value: "dates / parameters", text: "Dates / Parameters", isChecked: ""},
    {value: "provider signature", text: "Provider Signature", isChecked: ""},
    {value: "date signed", text: "Date Signed", isChecked: ""},
  ];
  paperWorkReviewList.forEach(data => {
    paperWorkReview.forEach(paperWorkData => {
      if (paperWorkData['paperWorkName'] === data['value'] && paperWorkData['isPaperWorkReview'] == 1) {
        data['isChecked'] = 'checked';
      }
    });
  });
  res.render('pages/claimreducedschedule', {
    title: 'Leave Overview',
    employeeLeaveInfoData: employeeLeaveInfoData,
    employeeLeaveClaimInfoData: employeeLeaveClaimInfoData,
    planMaximumDuration: planMaximumDuration,
    planStatus: planStatus,
    paperWorkReviewList: paperWorkReviewList,
    paperWorkReviewDocumentList: paperWorkReviewDocumentList,
    getManagerData: getManagerData,
    userId: userId,
    employeeInfo: JSON.stringify(employeeInfoResult.data),
    employeeLocationInfo: JSON.stringify(employeeLocationInfoResult.data),
  });
});

router.get('/decision/:claimNumber', middleware.checkAccessToken, async function (req, res, next) {
  let leaveService = require('./../server/api/leave/leave.service');
  let employeeService = require('./../server/api/employee/employee.service');
  let employeeLeaveClaimInfoResult = await leaveService.getEmployeeLeaveClaimInfoService(req);
  req['query'] = {
    empId: employeeLeaveClaimInfoResult.data.employeeInfo['empId']
  }
  let employeeInfoResult = await employeeService.getEmployeeInfoService(req);
  let employeeLocationInfoResult = await employeeService.getEmployeeLocationInfoService(req);
  let employeeLeaveClaimInfoData, planMaximumDuration, planStatus, employeeInfo, employeeLocationInfo;

  if (employeeLeaveClaimInfoResult.status === true) {
    employeeLeaveClaimInfoData = employeeLeaveClaimInfoResult.data.leaveInfo;
    planMaximumDuration = employeeLeaveClaimInfoResult.data.planMaximumDuration;
    planStatus = employeeLeaveClaimInfoResult.data.planStatus

  } else {
    employeeInfo = undefined;
    employeeLocationInfo = undefined;
  }
  res.render('pages/decision', {
    title: 'Leave Overview',
    employeeInfo: JSON.stringify(employeeInfoResult.data),
    employeeLocationInfo: JSON.stringify(employeeLocationInfoResult.data),
    employeeLeaveClaimInfoData: employeeLeaveClaimInfoData,
    planMaximumDuration: planMaximumDuration,
    planStatus: planStatus,

  });
});

router.get('/leavechoronology/:claimNumber', middleware.checkAccessToken, async function (req, res, next) {
  let leaveService = require('./../server/api/leave/leave.service');
  let employeeLeaveClaimInfoResult = await leaveService.getEmployeeLeaveClaimInfoService(req);
  let employeeLeaveClaimInfoData, planMaximumDuration, planStatus;
  let getLeaveChronologyResult = await leaveService.getLeaveChronologyServiceService(req);
  console.log(getLeaveChronologyResult);

  if (employeeLeaveClaimInfoResult.status === true) {
    employeeLeaveClaimInfoData = employeeLeaveClaimInfoResult.data.leaveInfo;
    planMaximumDuration = employeeLeaveClaimInfoResult.data.planMaximumDuration;
    planStatus = employeeLeaveClaimInfoResult.data.planStatus

  } else {

  }
  res.render('pages/leavechronology', {
    title: 'Leave Overview',
    employeeLeaveClaimInfoData: employeeLeaveClaimInfoData,
    planMaximumDuration: planMaximumDuration,
    planStatus: planStatus,
    leaveChronologyData: getLeaveChronologyResult.data,
    d3: require("d3")

  });
});

router.get('/closeLeave/:claimNumber', middleware.checkAccessToken, async function (req, res, next) {
  let leaveService = require('./../server/api/leave/leave.service');
  let employeeLeaveClaimInfoResult = await leaveService.leaveCloseService(req);
  let claimNumber = req.params.claimNumber;
  res.redirect('/claimcontinuous/' + claimNumber);
});


module.exports = router;

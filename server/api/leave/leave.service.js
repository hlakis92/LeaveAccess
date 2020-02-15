let debug = require('debug')('server:api:leave:service');
let DateLibrary = require('date-management');
let leaveRule = require('./leave.rule');
let common = require('../common');
let d3 = require('d3');
let leaveDAL = require('./leave.DAL');
let constant = require('../constant');
// let dbDateFormatDOB = constant.appConfig.DB_DATE_FORMAT_DOB;


/**
 * Created By: AV
 * Updated By: AV
 *
 * checkLeaveEligibilityService
 * @param  {object}  request
 * @return {object}
 *
 */
let checkLeaveEligibilityService = async (request) => {
  debug("leave.service -> checkLeaveEligibilityService");
  let data = request.body;
  data['service_period_in_month'] = parseInt((DateLibrary.getDateDifference(new Date(data['doj']), new Date(), {granularityType: 'days'})) / 30);
  debug(data);
  let leaveEligiblityList = leaveRule.checkLeaveEligibilty(data);
  debug("leave match", leaveEligiblityList);
  return {status: true, data: leaveEligiblityList}
};

/**
 * Created By: AV
 * Updated By: AV
 *
 * checkLeaveEligibilityService
 * @param  {object}  request
 * @return {object}
 *
 */
let addAllDataService = async (request) => {
  debug("leave.service -> addAllDataService");
  let data = common.cloneObject(request.body);
  debug("all data", common.cloneObject(data));

  let employeeInfo = common.cloneObject(data['employeeInfo']);
  let locationInfo = common.cloneObject(data['locationInfo']);
  let leaveReasonInfo = common.cloneObject(data['leaveReasonInfo']);
  let leaveProviderInfo = common.cloneObject(data['leaveProviderInfo']);
  let leaveTypeInfo = common.cloneObject(data['leaveTypeInfo']);
  let leaveEligibilityList = common.cloneObject(data['leaveEligibilityList']);
  let empId = JSON.parse(data['employeeInfo'])['empId'] || 0;
  let locationId = JSON.parse(data['locationInfo'])['empId'] || 0;
  let leaveInfoId = JSON.parse(leaveProviderInfo)['leave_info_id'] || 0;
  if (empId === 0) {
    let employeeInfoResult = await leaveDAL.addEmployeeDetail(employeeInfo);

    if (employeeInfoResult.status === true) {
      empId = employeeInfoResult.content['insertId'];
    }
    let locationId;
    let locationInfoResult = await leaveDAL.addLocationDetail(locationInfo, empId);
    if (employeeInfoResult.status === true) {
      locationId = locationInfoResult.content['insertId'];
    }
    if (locationId !== undefined) {
      await leaveDAL.addEmployeeWorkSchedule(empId, locationId, locationInfo);
    }
  }
  if (leaveInfoId === 0) {
    let leaveInfoResult = await leaveDAL.addLeaveInfo(leaveReasonInfo, leaveProviderInfo, leaveTypeInfo, empId);
    if (leaveInfoResult.status === true) {
      leaveInfoId = leaveInfoResult.content['insertId']
    }
    let addLeaveResult = await leaveDAL.addEmployeeLeave(leaveEligibilityList, empId, leaveInfoId);
    debug("employeeInfoResult", empId);
  }

  return {status: true, data: {}}
};

/**
 * Created By: AV
 * Updated By: AV
 *
 * checkLeaveEligibilityService
 *
 * @param  {object}  request
 * @return {object}
 *
 */
let getEmployeeLeaveService = async (request) => {
  debug("leave.service -> getEmployeeLeaveService");
  let employeeLeaveResult = await leaveDAL.getAllEmployeeLeave();
  if (employeeLeaveResult.status === true) {
    return {status: true, data: employeeLeaveResult.content}
  } else {
    return {status: false, error: {}}
  }
};

/**
 * Created By: AV
 * Updated By: AV
 *
 * getEmployeeLeaveSummaryService
 *
 * @param  {object}  request
 * @return {object}
 *
 */
let getEmployeeLeaveSummaryService = async (request) => {
  debug("leave.service -> getEmployeeLeaveService");
  let empId = request.params.empId;
  let employeeLeaveSummaryResult = await leaveDAL.getEmployeeLeaveSummaryByEmpId(empId);
  if (employeeLeaveSummaryResult.status === true) {
    return {status: true, data: employeeLeaveSummaryResult.content}
  } else {
    return {status: false, error: {}}
  }
};

/**
 * Created By: AV
 * Updated By: AV
 *
 * getEmployeeLeaveClaimInfoService
 *
 * @param  {object}  request
 * @return {object}
 *
 */
let getEmployeeLeaveClaimInfoService = async (request) => {
  debug("leave.service -> getEmployeeLeaveClaimInfoService");
  let claimNumber = request.params.claimNumber;
  let employeeLeaveInfoResult = await leaveDAL.getEmployeeLeaveClaimInfoByClaimNumber(claimNumber);
  let employeeLeaveClaimInfoResult = await leaveDAL.getEmployeeLeaveClaimInfoServiceByClaimNumber(claimNumber);
  let employeeLeaveMaximumDurationResult = await leaveDAL.getEmployeeLeavePlanSummaryMaxDurationByClaimNumber(claimNumber);
  let employeeLeavePlanStatusByClaimNumberResult = await leaveDAL.getEmployeeLeavePlanStatusByClaimNumber(claimNumber);
  let employeePaperWorkReviewResult = await leaveDAL.getEmployeeLeavePaperWorkReviewDataByClaimNumber(claimNumber);
  let employeePaperWorkReviewDocumentResult = await leaveDAL.getEmployeeLeavePaperWorkReviewDocumentDataByClaimNumber(claimNumber);
  if(employeePaperWorkReviewDocumentResult.status===true){
    (employeePaperWorkReviewDocumentResult.content).forEach(data=>{
      data['url'] = constant.appConfig.MEDIA_GET_STATIC_URL+data['url'];
    });
  }
  let employeeLeaveMaximumDurationData;
  if (employeeLeaveMaximumDurationResult.status === true && employeeLeaveMaximumDurationResult.content.length !== 0) {
    employeeLeaveMaximumDurationData = employeeLeaveMaximumDurationResult.content;
    employeeLeaveMaximumDurationData.forEach(data => {
      if (data['maximum_duration'] !== 'Unlimited') {
        let maximumDuration = JSON.parse(data['maximum_duration']);
        if (maximumDuration.granularityType === 'days' && maximumDuration.value === 84) {
          data['total'] = (maximumDuration.value) / 7 * 5 * 8 + " Hours / " + maximumDuration.value / 7 + " Weeks"
          data['usage'] = (maximumDuration.value) / 7 * 5 * 8 + " Hours / " + maximumDuration.value / 7 + " Weeks"
          data['remain'] = (maximumDuration.value) / 7 * 5 * 8 + " Hours / " + maximumDuration.value / 7 + " Weeks"
        }
      } else {
        data['total'] = "-";
        data['usage'] = "-";
        data['remain'] = "-";
      }
    });
  }
  if (employeeLeaveClaimInfoResult.status === true && employeeLeaveClaimInfoResult.content.length !== 0) {
    return {
      status: true, data: {
        employeeInfo:employeeLeaveInfoResult.content[0],
        leaveInfo: employeeLeaveClaimInfoResult.content[0],
        planMaximumDuration: employeeLeaveMaximumDurationData,
        planStatus: employeeLeavePlanStatusByClaimNumberResult.content,
        paperWorkReview: employeePaperWorkReviewResult.content,
        paperWorkReviewDocument: employeePaperWorkReviewDocumentResult.content
      }
    }
  } else {
    return {status: false, error: {}}
  }
};

/**
 * Created By: AV
 * Updated By: AV
 *
 * editLeaveDecisionService
 * @param  {object}  request
 * @return {object}
 *
 */
let editLeaveDecisionService = async (request) => {
  debug("leave.service -> editLeaveDecisionService");
  let data = common.cloneObject(request.body);
  let leaveInfoId = data['leaveInfoId'];
  // let employeeInfo = common.cloneObject(data['employeeInfo']);
  debug("...............................................", data);
  let fieldValueUpdateLeaveInfo = [{
    field: 'startDate',
    fValue: data['startDate']
  }, {
    field: 'endDate',
    fValue: data['endDate']
  }, {
    field: 'leaveTypeStatus',
    fValue: data['leaveType']
  }];
  let fieldValueUpdateEmployeeLeave = [{
    field: 'from_date',
    fValue: data['startDate']
  }, {
    field: 'to_date',
    fValue: data['endDate']
  }, {
    field: 'leaveTypeStatus',
    fValue: data['leaveType']
  }];

  await leaveDAL.editLeaveInfoByLeaveInfoId(leaveInfoId, fieldValueUpdateLeaveInfo);
  await leaveDAL.editEmployeeLeaveByLeaveInfoId(leaveInfoId, fieldValueUpdateEmployeeLeave);
  return {status: true, data: {}};
};

/**
 * Created By: AV
 * Updated By: AV
 *
 * checkEmployeeExistOrNotService
 * @param  {object}  request
 * @return {object}
 *
 */
let checkEmployeeExistOrNotService = async (request) => {
  debug("leave.service -> checkEmployeeExistOrNotService");
  let data = common.cloneObject(request.body);
  let employeeId = data.employeeId;
  let empId = data.empId;
  debug("............................", empId)
  if (empId > 0) {
    return {
      status: true,
      data: {}
    };
  }
  let result = await leaveDAL.checkEmployeeExistOrNotByEmployeeId(employeeId);
  if (result.status === true && result.content.length > 0) {
    return {
      status: false,
      error: constant.leaveMessages.ERR_IN_EMPLOYEE_ID_ALREADY_EXIST
    };
  } else {
    return {
      status: true,
      data: {}
    };
  }
};

/**
 * Created By: AV
 * Updated By: AV
 *
 * leaveCloseService
 * @param  {object}  request
 * @return {object}
 *
 */
let leaveCloseService = async (request) => {
  debug("leave.service -> leaveCloseService");
  let leaveInfoId = request.params.claimNumber;
  let result = await leaveDAL.leaveCloseByLeaveInfoId(leaveInfoId);
  return {
    status: true,
    data: {}
  };
};

/**
 * Created By: AV
 * Updated By: AV
 *
 * getEmployeeLeaveProviderService
 * @param  {object}  request
 * @return {object}
 *
 */
let getEmployeeLeaveProviderService = async (request) => {
  debug("leave.service -> getEmployeeLeaveProviderService");
  let leaveInfoId = request.query.claimNumber;
  let result = await leaveDAL.getEmployeeLeaveProviderByLeaveInfoId(leaveInfoId);
  return {
    status: true,
    data: result.content[0]
  };
};

/**
 * Created By: AV
 * Updated By: AV
 *
 * getEmployeeLeaveEligibilityService
 * @param  {object}  request
 * @return {object}
 *
 */
let getEmployeeLeaveEligibilityService = async (request) => {
  debug("leave.service -> getEmployeeLeaveEligibilityService");
  let leaveInfoId = request.query.claimNumber;
  let result = await leaveDAL.getEmployeeLeaveEligibilityByLeaveInfoId(leaveInfoId);
  return {
    status: true,
    data: result.content
  };
};

/**
 * Created By: AV
 * Updated By: AV
 *
 * getEmployeeLeaveEligibilityService
 * @param  {object}  request
 * @return {object}
 *
 */
let returnToWorkConfirmationService = async (request) => {
  debug("leave.service -> returnToWorkConfirmationService");
  let leaveInfoId = request.body.leaveInfoId;
  let type = request.body.type; // [ERTW | ARTW]
  let fieldValueUpdate;
  if (type === "ERTW") {
    fieldValueUpdate = [{
      field: 'ERTW_userId',
      fValue: request.body['ERTW_userId']
    }, {
      field: 'ERTWDate',
      fValue: request.body['ERTWDate']
    }]
  } else if (type === "ARTW") {
    fieldValueUpdate = [{
      field: 'ARTW_userId',
      fValue: request.body['ARTW_userId']
    }, {
      field: 'ARTWDate',
      fValue: request.body['ARTWDate']
    }]
  }
  let result = await leaveDAL.editLeaveInfoByLeaveInfoId(leaveInfoId, fieldValueUpdate);
  let successMessage = constant.leaveMessages.MSG_RETURN_TO_WORK_CONFIRMATION_ADDED_SUCCESSFULLY;
  successMessage.message = common.generatingTemplate(successMessage.message, {type: type});
  return {
    status: true,
    data: successMessage,
  };
};

/**
 * Created By: AV
 * Updated By: AV
 *
 * getEmployeeLeaveEligibilityService
 * @param  {object}  request
 * @return {object}
 *
 */
let paperWorkReviewService = async (request) => {
  debug("leave.service -> paperWorkReviewService");
  let leaveInfoId = request.body.leaveInfoId;
  let paperWorkDataSelected = (request.body.paperWorkDataSelected).split(",");
  let paperWorkDataUnSelected = (request.body.paperWorkDataUnSelected).split(",");
  let addValueArray = [];
  paperWorkDataSelected.forEach(data => {
    if (data !== "") {
      addValueArray.push([leaveInfoId, data, 1]);
    }
  });
  paperWorkDataUnSelected.forEach(data => {
    if (data !== "") {
      addValueArray.push([leaveInfoId, data, 0]);
    }
  });
  await leaveDAL.removePaperWorkReviewByLeaveInfoId(leaveInfoId);
  await leaveDAL.addPaperWorkReview(addValueArray);
  return {
    status: true,
    data: constant.leaveMessages.MSG_PAPER_WORK_REVIEW_UPDATED_SUCCESSFULLY
  }
};

module.exports = {
  checkLeaveEligibilityService: checkLeaveEligibilityService,
  addAllDataService: addAllDataService,
  getEmployeeLeaveService: getEmployeeLeaveService,
  getEmployeeLeaveSummaryService: getEmployeeLeaveSummaryService,
  getEmployeeLeaveClaimInfoService: getEmployeeLeaveClaimInfoService,
  editLeaveDecisionService: editLeaveDecisionService,
  checkEmployeeExistOrNotService: checkEmployeeExistOrNotService,
  leaveCloseService: leaveCloseService,
  getEmployeeLeaveProviderService: getEmployeeLeaveProviderService,
  getEmployeeLeaveEligibilityService: getEmployeeLeaveEligibilityService,
  returnToWorkConfirmationService: returnToWorkConfirmationService,
  paperWorkReviewService: paperWorkReviewService,
};

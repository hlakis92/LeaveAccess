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

  let employeeInfoResult = await leaveDAL.addEmployeeDetail(employeeInfo);
  let empId;
  if (employeeInfoResult.status === true) {
    empId = employeeInfoResult.content['insertId']
  }
  let locationInfoResult = await leaveDAL.addLocationDetail(locationInfo, empId);
  let leaveInfoResult = await leaveDAL.addLeaveInfo(leaveReasonInfo, leaveProviderInfo, leaveTypeInfo, empId);
  let leaveInfoId;
  if (leaveInfoResult.status === true) {
    leaveInfoId = leaveInfoResult.content['insertId']
  }

  let addLeaveResult = await leaveDAL.addEmployeeLeave(leaveEligibilityList, empId, leaveInfoId);
  debug("employeeInfoResult", empId);
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
}

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
  let employeeLeaveClaimInfoResult = await leaveDAL.getEmployeeLeaveClaimInfoServiceByClaimNumber(claimNumber);
  let employeeLeaveMaximumDurationResult = await leaveDAL.getEmployeeLeavePlanSummaryMaxDurationByClaimNumber(claimNumber);
  let employeeLeavePlanStatusByClaimNumberResult = await leaveDAL.getEmployeeLeavePlanStatusByClaimNumber(claimNumber);
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
        leaveInfo: employeeLeaveClaimInfoResult.content[0],
        planMaximumDuration: employeeLeaveMaximumDurationData,
        planStatus: employeeLeavePlanStatusByClaimNumberResult.content
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


module.exports = {
  checkLeaveEligibilityService: checkLeaveEligibilityService,
  addAllDataService: addAllDataService,
  getEmployeeLeaveService: getEmployeeLeaveService,
  getEmployeeLeaveSummaryService: getEmployeeLeaveSummaryService,
  getEmployeeLeaveClaimInfoService: getEmployeeLeaveClaimInfoService,
  editLeaveDecisionService: editLeaveDecisionService,
};

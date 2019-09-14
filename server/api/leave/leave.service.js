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
  let leaveInfo = await leaveDAL.addLeaveInfo(leaveReasonInfo, leaveProviderInfo, leaveTypeInfo, empId);
  let addLeaveResult = await leaveDAL.addEmployeeLeave(leaveEligibilityList, empId);
  debug("employeeInfoResult", empId);
  return {status: true, data: {}}
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
let getEmployeeLeaveService = async (request) => {
  debug("leave.service -> getEmployeeLeaveService");
  let employeeLeaveResult = await leaveDAL.getAllEmployeeLeave();
  if (employeeLeaveResult.status === true) {
    return {status: true, data: employeeLeaveResult.content}
  } else {
    return {status: false, error: {}}
  }

};


module.exports = {
  checkLeaveEligibilityService: checkLeaveEligibilityService,
  addAllDataService: addAllDataService,
  getEmployeeLeaveService: getEmployeeLeaveService,
};

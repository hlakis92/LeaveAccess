let debug = require('debug')('server:api:leave:service');
let DateLibrary = require('date-management');
let leaveRule= require('./leave.rule');
let d3 = require('d3');
// let employeeDAL = require('./employee.DAL');
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
  data['service_period_in_month'] = parseInt((DateLibrary.getDateDifference(new Date(data['doj']),new Date(),  {granularityType: 'days'}))/30);
  debug(data);
  let leaveEligiblityList = leaveRule.checkLeaveEligibilty(data);
  debug("leave match",leaveEligiblityList);
  return {status: true, data: leaveEligiblityList}
};

module.exports = {
  checkLeaveEligibilityService: checkLeaveEligibilityService,
};

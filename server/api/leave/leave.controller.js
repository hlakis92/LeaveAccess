let debug = require('debug')('server:api:leave:controller');
let leaveService = require('./leave.service');
let constant = require('../constant');

/**
 * Created By: AV
 * Updated By: AV
 *
 *
 * @param  {object} request
 * @param  {object} response
 * @return {object}
 */
let checkLeaveEligibility = async (request, response) => {
  debug("leave.controller -> checkLeaveEligibility");
  let result= await leaveService.checkLeaveEligibilityService(request);
  // debug(request.body);
  return response.send(result);

};

/**
 * Created By: AV
 * Updated By: AV
 *
 * @param  {object} request
 * @param  {object} response
 * @return {object}
 */
let addAllData = async (request, response) => {
  debug("leave.controller -> addAllData");
  let result = await leaveService.addAllDataService(request);
  // debug(request.body);
  return response.send(result);
};

/**
 * Created By: AV
 * Updated By: AV
 *
 * @param  {object} request
 * @param  {object} response
 * @return {object}
 */
let getEmployeeLeave = async (request, response) => {
  debug("leave.controller -> addAllData");
  let result = await leaveService.getEmployeeLeaveService(request);
  // debug(request.body);
  return response.send(result);
};

module.exports = {
  // addEmployee: addEmployee,
  checkLeaveEligibility: checkLeaveEligibility,
  addAllData:addAllData,
  getEmployeeLeave:getEmployeeLeave,
};
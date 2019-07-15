let debug = require('debug')('server:api:employee:service');
let d3 = require('d3');
let employeeDAL = require('./employee.DAL');
let constant = require('../constant');
let dbDateFormatDOB = constant.appConfig.DB_DATE_FORMAT_DOB;

/**
 * Created By: AV
 * Updated By: AV
 *
 * addEmployeeService
 * @param  {object}  request
 * @return {object}
 *
 */
let addEmployeeService = async (request) => {
  debug("employee.service -> addEmployeeService");
  if (request.body.first_name === undefined || request.body.first_name === undefined) {
    return {
      status: false,
      error: constant.requestMessages.ERR_INVALID_ADD_EMPLOYEE_REQUEST
    };
  }
  debug(request.body)
  let firstName = request.body['first_name'];
  let lastName = request.body['last_name'];
  let email = request.body['email'];
  let DOB = d3.timeFormat(dbDateFormatDOB)(new Date(request.body['DOB']));
  debug(DOB)
  let gender = request.body['gender'];
  let address1 = request.body['address1'];
  let address2 = request.body['address2'];
  let city = request.body['city'];
  let state = request.body['state'];
  let pincode = request.body['pincode'];
  let addArray = [firstName, lastName, email, DOB, gender, address1, address2, city, state, pincode];
  debug('...................',addArray)
  let addEmployeeResult = await employeeDAL.addEmployeeDetails(addArray);
  if (addEmployeeResult.status === true && addEmployeeResult.content.length !== 0) {
    return {status: true, data: constant.employeeMessages.MSG_ADD_EMPLOYEE_SUCCESSFULLY};
  } else {
    return {status: false, error: constant.employeeMessages.ERR_IN_ADD_EMPLOYEE};
  }
};

module.exports = {
  addEmployeeService: addEmployeeService,
};
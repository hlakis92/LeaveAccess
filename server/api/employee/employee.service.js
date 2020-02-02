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
  let gender = request.body['gender'];
  let address1 = request.body['address1'];
  let address2 = request.body['address2'];
  let city = request.body['city'];
  let state = request.body['state'];
  let pincode = request.body['pincode'];
  let addArray = [firstName, lastName, email, DOB, gender, address1, address2, city, state, pincode];
  let addEmployeeResult = await employeeDAL.addEmployeeDetails(addArray);
  if (addEmployeeResult.status === true && addEmployeeResult.content.length !== 0) {
    return {status: true, data: constant.employeeMessages.MSG_ADD_EMPLOYEE_SUCCESSFULLY};
  } else {
    return {status: false, error: constant.employeeMessages.ERR_IN_ADD_EMPLOYEE};
  }
};

/**
 * Created By: AV
 * Updated By: AV
 *
 * getAllEmployeeService
 * @param  {object}  request
 * @return {object}
 *
 */
let getAllEmployeeService = async (request) => {
  debug("employee.service -> getAllEmployeeService");
  let firstName = (request.query.firstname || "").toLowerCase();
  let lastName = (request.query.lastname || "").toLowerCase();
  let empId = (request.query.empid || "").toLowerCase();
  let customFilter = {and: []};
  if (firstName !== "") {
    customFilter.and.push({
      field: 'LOWER(firstName)',
      encloseField: false,
      operator: 'eq',
      value: firstName
    })
  }
  if (lastName !== "") {
    customFilter.and.push({
      field: 'LOWER(lastName)',
      encloseField: false,
      operator: 'eq',
      value: lastName
    })
  }
  if (empId !== "") {
    customFilter.and.push({
      field: 'LOWER(employeeId)',
      encloseField: false,
      operator: 'eq',
      value: empId
    })
  }
  if (customFilter.and.length === 0) {
    customFilter = undefined;
  }
  let getAllEmployeeByCustomFilterResult = await employeeDAL.getAllEmployeeByCustomFilter(customFilter);
  if (getAllEmployeeByCustomFilterResult.status === false || getAllEmployeeByCustomFilterResult.length === 0) {
    return {status: false, error: constant.employeeMessages.ERR_EMPLOYEE_NOT_FOUND}
  }
  return {status: true, data: getAllEmployeeByCustomFilterResult.content};
};

/**
 * Created By: AV
 * Updated By: AV
 *
 * getEmployeeInfoService
 * @param  {object}  request
 * @return {object}
 *
 */
let getEmployeeInfoService = async (request) => {
  debug("employee.service -> getAllEmployeeService");
  let empId = request.query.empId;
  let getEmployeeInfoResult = await employeeDAL.getEmployeeInfoByEmpId(empId);
  if (getEmployeeInfoResult.status === false || getEmployeeInfoResult.length === 0) {
    return {status: false, error: constant.employeeMessages.ERR_EMPLOYEE_NOT_FOUND}
  }
  return {status: true, data: getEmployeeInfoResult.content[0]};
};

/**
 * Created By: AV
 * Updated By: AV
 *
 * getEmployeeLocationInfoService
 * @param  {object}  request
 * @return {object}
 *
 */
let getEmployeeLocationInfoService = async (request) => {
  debug("employee.service -> getEmployeeLocationInfoService");
  let empId = request.query.empId;
  let getEmployeeLocationInfoResult = await employeeDAL.getEmployeeLocationInfoByEmpId(empId);
  if (getEmployeeLocationInfoResult.status === false || getEmployeeLocationInfoResult.length === 0) {
    return {status: false, error: constant.employeeMessages.ERR_EMPLOYEE_NOT_FOUND}
  }
  return {status: true, data: getEmployeeLocationInfoResult.content[0]};
};

module.exports = {
  addEmployeeService: addEmployeeService,
  getAllEmployeeService: getAllEmployeeService,
  getEmployeeInfoService: getEmployeeInfoService,
  getEmployeeLocationInfoService: getEmployeeLocationInfoService,
};
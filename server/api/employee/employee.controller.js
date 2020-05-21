let debug = require('debug')('server:api:employee:controller');
let employeeService = require('./employee.service');
let constant = require('../constant');

/**
 * Created By: AV
 * Updated By: AV
 *
 * add employee information
 *
 * @param  {object} request
 * @param  {object} response
 * @return {object}
 */
let addEmployee = async (request, response) => {
  debug("employee.controller -> addEmployee");
  // return {status:true};
  if (request.body !== undefined && typeof request.body === "object") {
    let result = employeeService.addEmployeeService(request);
    response.status = 201;
    response.send(result);
  } else {
    return response.send({
      status: false,
      error: constant.requestMessages.ERR_INVALID_ADD_EMPLOYEE_REQUEST
    });
  }
};

/**
 * Created By: AV
 * Updated By: AV
 *
 * no longer to use
 *
 * @param  {object} request
 * @param  {object} response
 * @return {object}
 */
/*let dummyCall = async (request, response) => {
  debug("employee.controller -> dummyCall");
  debug(request.body);
  return response.send({
    status: true,
    data: {}
  });
};*/

/**
 * Created By: AV
 * Updated By: AV
 *
 * get all employee
 *
 * @param  {object} request
 * @param  {object} response
 * @return {object}
 */
let getAllEmployee = async (request, response) => {
  debug("employee.controller -> getAllEmployee");
  response.send(await employeeService.getAllEmployeeService(request));
};


module.exports = {
  addEmployee: addEmployee,
  // dummyCall: dummyCall,
  getAllEmployee: getAllEmployee,
};
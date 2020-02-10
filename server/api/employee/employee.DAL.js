let debug = require('debug')('server:api:employee:DAL');
let query = require('./employee.query');
let common = require('./../common');

let addEmployeeDetails = async (addArray) => {
  debug("employee.DAL -> addEmployeeDetails");
  let addEmployeeDetailsQuery = common.cloneObject(query.addEmployeeDetailsQuery);
  addEmployeeDetailsQuery.insert.fValue = addArray;
  return await common.executeQuery(addEmployeeDetailsQuery);
};

let getAllEmployeeByCustomFilter = async (customFilter) => {
  debug("employee.DAL -> getAllEmployeeBYCustomFilter");
  let getAllEmployeeByCustomFilterQuery = common.cloneObject(query.getAllEmployeeByCustomFilterQuery);
  if (customFilter !== undefined) {
    getAllEmployeeByCustomFilterQuery.filter = customFilter;
  }
  return await common.executeQuery(getAllEmployeeByCustomFilterQuery);
};

let getEmployeeInfoByEmpId = async (empId) => {
  debug("employee.DAL -> getEmployeeInfoByEmpId");
  let getEmployeeInfoByEmpIdQuery = common.cloneObject(query.getEmployeeInfoByEmpIdQuery);
  getEmployeeInfoByEmpIdQuery.filter.value = empId;
  return await common.executeQuery(getEmployeeInfoByEmpIdQuery);
};

let getEmployeeLocationInfoByEmpId = async (empId) => {
  debug("employee.DAL -> getEmployeeLocationInfoByEmpId");
  let getEmployeeLocationInfoByEmpIdQuery = common.cloneObject(query.getEmployeeLocationInfoByEmpIdQuery);
  getEmployeeLocationInfoByEmpIdQuery.filter.value = empId;
  return await common.executeQuery(getEmployeeLocationInfoByEmpIdQuery);
};

module.exports = {
  addEmployeeDetails: addEmployeeDetails,
  getAllEmployeeByCustomFilter: getAllEmployeeByCustomFilter,
  getEmployeeInfoByEmpId: getEmployeeInfoByEmpId,
  getEmployeeLocationInfoByEmpId: getEmployeeLocationInfoByEmpId,
};
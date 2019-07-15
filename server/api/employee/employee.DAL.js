let debug = require('debug')('server:api:employee:DAL');
let query = require('./employee.query');
let common = require('./../common');

let addEmployeeDetails = async (addArray) => {
  debug("employee.DAL -> addEmployeeDetails");
  let addEmployeeDetailsQuery = common.cloneObject(query.addEmployeeDetailsQuery);
  addEmployeeDetailsQuery.insert.fValue = addArray;
  return await common.executeQuery(addEmployeeDetailsQuery);
};

module.exports = {
  addEmployeeDetails: addEmployeeDetails
};
let debug = require('debug')('server:api:user:DAL');
// let d3 = require(d3);
let DateLibrary = require('date-management');
let common = require('../common');
let constant = require('../constant');
let query = require('./leave.query');
let dbDateFormat = constant.appConfig.DB_DATE_FORMAT;

let addEmployeeDetail = async (employeeInfo) => {
  debug("user.DAL -> addEmployeeDetail");
  employeeInfo = JSON.parse(employeeInfo);
  let firstName = employeeInfo['first_name'];
  let lastName = employeeInfo['last_name'];
  let email = employeeInfo['email'];
  let DOB = employeeInfo['DOB'];
  let gender = employeeInfo['gender'];
  let address1 = employeeInfo['address1'];
  let address2 = employeeInfo['address2'];
  let cityName = employeeInfo['city'];
  let stateName = employeeInfo['state'];
  let pincode = employeeInfo['pincode'];
  let addEmployeeDetailsQuery = common.cloneObject(query.addEmployeeDetailsQuery);
  addEmployeeDetailsQuery.insert.fValue = [firstName, lastName, email, DOB, gender, address1, address2, cityName, stateName, pincode];
  return await common.executeQuery(addEmployeeDetailsQuery);
};

let addLocationDetail = async (locationInfo, empId) => {
  debug("user.DAL -> addLocationDetail");
  locationInfo = JSON.parse(locationInfo);
  let DOJ = locationInfo['DOJ'];
  let employeeId = locationInfo['employeeId'];
  let locationEmail = locationInfo['locationEmail'];
  let _12MonthHours = locationInfo['_12MonthHours'];
  let address = locationInfo['address'];
  let city = locationInfo['city'];
  let state = locationInfo['state'];
  let pincode = locationInfo['pincode'];
  let addLocationDetailsQuery = common.cloneObject(query.addLocationDetailsQuery);
  addLocationDetailsQuery.insert.fValue = [empId, DOJ, employeeId, locationEmail, _12MonthHours, address, city, state, pincode];
  return await common.executeQuery(addLocationDetailsQuery);
};

let addLeaveInfo = async (leaveReasonInfo, leaveProviderInfo, leaveTypeInfo, empId) => {
  debug("user.DAL -> addLeaveInfo");
  leaveReasonInfo = JSON.parse(leaveReasonInfo);
  leaveProviderInfo = JSON.parse(leaveProviderInfo);
  leaveTypeInfo = JSON.parse(leaveTypeInfo);
  let leaveReason = leaveReasonInfo['leaveReason'];
  let familyFirst = leaveProviderInfo['familyFirst'];
  let familyLast = leaveProviderInfo['familyLast'];
  let familyMemberDOB = leaveProviderInfo['familyMemberDOB'];
  let familyRelation = leaveProviderInfo['familyRelation'];
  let inLocoParent = leaveProviderInfo['inLocoParent'];
  let providerName = leaveProviderInfo['providerName'];
  let providerType = leaveProviderInfo['providerType'];
  let providePhone = leaveProviderInfo['providePhone'];
  let provideFax = leaveProviderInfo['provideFax'];
  let provideAddress = leaveProviderInfo['provideAddress'];
  let startDate = leaveTypeInfo['startDate'];
  let endDate = leaveTypeInfo['endDate'];
  let leaveType = leaveTypeInfo['leaveType'];
  let addLeaveInfoQuery = common.cloneObject(query.addLeaveInfoQuery);
  addLeaveInfoQuery.insert.fValue = [empId, leaveReason, familyFirst, familyLast, familyMemberDOB,
    familyRelation, inLocoParent, providerName, providerType, providePhone, provideFax,
    provideAddress, startDate, endDate, leaveType];
  return await common.executeQuery(addLeaveInfoQuery);
};

let addEmployeeLeave = async (leaveEligibilityList, empId) => {
  debug("user.DAL -> addEmployeeLeave");
  leaveEligibilityList = JSON.parse(leaveEligibilityList);
  let rawData=[];
  leaveEligibilityList.forEach(data=>{
    let leaveId = data['_comment'];
    let state = data['state'];
    let leave_name = data['leave_name'];
    let eligibility = JSON.stringify(data['eligibility']);
    let qualifying_reason = JSON.stringify(data['qualifying_reason']);
    let leave_type = data['leave_type'];
    let maximum_duration = JSON.stringify(data['maximum_duration']);
    let from_date = data['from_date'];
    let to_date = data['to_date'];
    rawData.push([empId, leaveId, leave_name, state, eligibility, qualifying_reason, leave_type, maximum_duration, from_date, to_date]);
  });

  let addEmployeeLeaveQuery = common.cloneObject(query.addEmployeeLeaveQuery);
  addEmployeeLeaveQuery.insert.fValue = rawData;
  return await common.executeQuery(addEmployeeLeaveQuery);
};



module.exports = {
  addEmployeeDetail: addEmployeeDetail,
  addLocationDetail: addLocationDetail,
  addLeaveInfo: addLeaveInfo,
  addEmployeeLeave: addEmployeeLeave
};

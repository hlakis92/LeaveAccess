let debug = require('debug')('server:api:user:DAL');
// let d3 = require(d3);
let DateLibrary = require('date-management');
let common = require('../common');
let constant = require('../constant');
let query = require('./leave.query');
let dbDateFormat = constant.appConfig.DB_DATE_FORMAT;

let addEmployeeDetail = async (employeeInfo) => {
  debug("leave.DAL -> addEmployeeDetail");
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
  debug("leave.DAL -> addLocationDetail");
  locationInfo = JSON.parse(locationInfo);
  let DOJ = locationInfo['DOJ'];
  let employeeId = locationInfo['employeeId'];
  let locationEmail = locationInfo['locationEmail'];
  let _12MonthHours = locationInfo['_12MonthHours'];
  let address = locationInfo['address'];
  let city = locationInfo['city'];
  let state = locationInfo['state'];
  let pincode = locationInfo['pincode'];
  let supervisorName = locationInfo['supervisorName'] || 'NULL';
  let supervisorPhone = locationInfo['supervisorPhone'] || 'NULL';
  let supervisorEmail = locationInfo['supervisorEmail'] || 'NULL';
  let hrName = locationInfo['hrName'] || 'NULL';
  let hrPhone = locationInfo['hrPhone'] || 'NULL';
  let hrEmail = locationInfo['hrEmail'] || 'NULL';
  let payrollName = locationInfo['payrollName'] || 'NULL';
  let payrollPhone = locationInfo['payrollPhone'] || 'NULL';
  let payrollEmail = locationInfo['payrollEmail'] || 'NULL';
  let addLocationDetailsQuery = common.cloneObject(query.addLocationDetailsQuery);
  addLocationDetailsQuery.insert.fValue = [empId, DOJ, employeeId, locationEmail, _12MonthHours, address, city, state, pincode,
    supervisorName, supervisorPhone, supervisorEmail, hrName, hrPhone, hrEmail, payrollName, payrollPhone, payrollEmail];
  return await common.executeQuery(addLocationDetailsQuery);
};

let addEmployeeWorkSchedule = async (empId, locationId, locationInfo) => {
  debug("leave.DAL -> addEmployeeWorkSchedule");
  locationInfo = JSON.parse(locationInfo);
  let sundayRSHours = locationInfo['inputsundayRSHours'];
  let mondayRSHours = locationInfo['inputmondayRSHours'];
  let tuesdayRSHours = locationInfo['inputtuesdayRSHours'];
  let wednesdayRSHours = locationInfo['inputwednesdayRSHours'];
  let thursdayRSHours = locationInfo['inputthursdayRSHours'];
  let fridayRSHours = locationInfo['inputfridayRSHours'];
  let saturdayRSHours = locationInfo['inputsaturdayRSHours'];
  let addEmployeeWorkScheduleQuery = common.cloneObject(query.addEmployeeWorkScheduleQuery);
  addEmployeeWorkScheduleQuery.insert.fValue = [empId, locationId, sundayRSHours, mondayRSHours, tuesdayRSHours, wednesdayRSHours, thursdayRSHours, fridayRSHours, saturdayRSHours];
  return await common.executeQuery(addEmployeeWorkScheduleQuery);
};

let addLeaveInfo = async (leaveReasonInfo, leaveProviderInfo, leaveTypeInfo, empId) => {
  debug("leave.DAL -> addLeaveInfo");
  leaveReasonInfo = JSON.parse(leaveReasonInfo);
  leaveProviderInfo = JSON.parse(leaveProviderInfo);
  leaveTypeInfo = JSON.parse(leaveTypeInfo);
  let leaveReason = leaveReasonInfo['leaveReason'];
  let familyFirst = leaveProviderInfo['familyFirst'] || 'NULL';
  let familyLast = leaveProviderInfo['familyLast'] || 'NULL';
  let familyMemberDOB = leaveProviderInfo['familyMemberDOB'] || 'NULL';
  let familyRelation = leaveProviderInfo['familyRelation'] || 'NULL';
  let inLocoParent = leaveProviderInfo['inLocoParent'] || 'NULL';
  let providerName = leaveProviderInfo['providerName'] || 'NULL';
  let providerType = leaveProviderInfo['providerType'] || 'NULL';
  let providePhone = leaveProviderInfo['providePhone'] || 'NULL';
  let provideFax = leaveProviderInfo['provideFax'] || 'NULL';
  let provideAddress = leaveProviderInfo['provideAddress'] || 'NULL';
  let startDate = leaveTypeInfo['startDate'];
  let endDate = leaveTypeInfo['endDate'];
  let leaveType = leaveTypeInfo['leaveType'];
  let addLeaveInfoQuery = common.cloneObject(query.addLeaveInfoQuery);
  addLeaveInfoQuery.insert.fValue = [empId, leaveReason, familyFirst, familyLast, familyMemberDOB,
    familyRelation, inLocoParent, providerName, providerType, providePhone, provideFax,
    provideAddress, startDate, endDate, leaveType];
  return await common.executeQuery(addLeaveInfoQuery);
};

let addEmployeeLeave = async (leaveEligibilityList, empId, leaveInfoId, type) => {
  debug("leave.DAL -> addEmployeeLeave");
  leaveEligibilityList = JSON.parse(leaveEligibilityList);
  let rawData = [];
  leaveEligibilityList.forEach(data => {
    let leaveId = data['_comment'];
    let state = data['state'];
    let leave_name = data['leave_name'];

    let eligibility = JSON.stringify(data['eligibilityData']) || 'NULL';
    let qualifying_reason = JSON.stringify(data['qualifying_reason']) || 'NULL';
    let leave_type = data['leave_type'];
    let maximum_duration = JSON.stringify(data['maximum_duration']) || 'NULL';
    let from_date = data['from_date'];
    let to_date = data['to_date'];
    maximum_duration = maximum_duration === 'null' ? 'NULL' : maximum_duration;

    rawData.push([empId, leaveInfoId, leaveId, leave_name, state, eligibility, qualifying_reason, leave_type, maximum_duration, from_date, to_date]);
  });

  let addEmployeeLeaveQuery = common.cloneObject(query.addEmployeeLeaveQuery);
  addEmployeeLeaveQuery.insert.fValue = rawData;
  return await common.executeQuery(addEmployeeLeaveQuery);
};

let removeEmployeeLeave = async (leaveInfoId) => {
  debug("leave.DAL -> removeEmployeeLeave");
  let removeEmployeeLeaveQuery = common.cloneObject(query.removeEmployeeLeaveQuery);
  removeEmployeeLeaveQuery.filter.value = leaveInfoId;
  return await common.executeQuery(removeEmployeeLeaveQuery);
};


let getAllEmployeeLeave = async () => {
  debug("leave.DAL -> getAllEmployeeLeave");
  let getAllEmployeeLeaveQuery = common.cloneObject(query.getAllEmployeeLeaveQuery);
  return await common.executeQuery(getAllEmployeeLeaveQuery);
};

let getEmployeeLeaveSummaryByEmpId = async (empId) => {
  debug("leave.DAL -> getEmployeeLeaveSummaryByEmpId");
  let getEmployeeLeaveSummaryByEmpIdQuery = common.cloneObject(query.getEmployeeLeaveSummaryByEmpIdQuery);
  getEmployeeLeaveSummaryByEmpIdQuery.filter.value = empId;
  return await common.executeQuery(getEmployeeLeaveSummaryByEmpIdQuery);
};

let getEmployeeLeaveClaimInfoByClaimNumber = async (claimNumber) => {
  debug("leave.DAL -> getEmployeeLeaveClaimInfoByClaimNumber");
  let getEmployeeLeaveClaimInfoByClaimNumberQuery = common.cloneObject(query.getEmployeeLeaveClaimInfoByClaimNumberQuery);
  getEmployeeLeaveClaimInfoByClaimNumberQuery.filter.value = claimNumber;
  return await common.executeQuery(getEmployeeLeaveClaimInfoByClaimNumberQuery);
};

let getEmployeeLeaveClaimInfoServiceByClaimNumber = async (claimNumber) => {
  debug("leave.DAL -> getEmployeeLeaveClaimInfoServiceByClaimNumber");
  let getEmployeeLeaveClaimInfoServiceByClaimNumberQuery = common.cloneObject(query.getEmployeeLeaveClaimInfoServiceByClaimNumberQuery);
  getEmployeeLeaveClaimInfoServiceByClaimNumberQuery.filter.value = claimNumber;
  return await common.executeQuery(getEmployeeLeaveClaimInfoServiceByClaimNumberQuery);
};

let getEmployeeLeavePlanSummaryMaxDurationByClaimNumber = async (claimNumber) => {
  debug("leave.DAL -> getEmployeeLeaveClaimInfoServiceByClaimNumber");
  let getEmployeeLeavePlanSummaryMaxDurationByClaimNumberQuery = common.cloneObject(query.getEmployeeLeavePlanSummaryMaxDurationByClaimNumberQuery);
  getEmployeeLeavePlanSummaryMaxDurationByClaimNumberQuery.filter.value = claimNumber;
  return await common.executeQuery(getEmployeeLeavePlanSummaryMaxDurationByClaimNumberQuery);
};

let getEmployeeLeavePlanStatusByClaimNumber = async (claimNumber) => {
  debug("leave.DAL -> getEmployeeLeavePlanStatusByClaimNumber");
  let getEmployeeLeavePlanStatusByClaimNumberQuery = common.cloneObject(query.getEmployeeLeavePlanStatusByClaimNumberQuery);
  getEmployeeLeavePlanStatusByClaimNumberQuery.filter.value = claimNumber;
  return await common.executeQuery(getEmployeeLeavePlanStatusByClaimNumberQuery);
};

let editLeaveInfoByLeaveInfoId = async (leaveInfoId, fieldValueUpdate) => {
  debug("leave.DAL -> editLeaveInfoByLeaveInfoId");
  let editLeaveInfoByLeaveInfoIdQuery = common.cloneObject(query.editLeaveInfoByLeaveInfoIdQuery);
  editLeaveInfoByLeaveInfoIdQuery.update = fieldValueUpdate;
  editLeaveInfoByLeaveInfoIdQuery.filter.value = leaveInfoId;
  return await common.executeQuery(editLeaveInfoByLeaveInfoIdQuery);
};

let editEmployeeLeaveByLeaveInfoId = async (leaveInfoId, fieldValueUpdate) => {
  debug("leave.DAL -> editEmployeeLeaveByLeaveInfoId");
  let editEmployeeLeaveByLeaveInfoIdQuery = common.cloneObject(query.editEmployeeLeaveByLeaveInfoIdQuery);
  editEmployeeLeaveByLeaveInfoIdQuery.update = fieldValueUpdate;
  editEmployeeLeaveByLeaveInfoIdQuery.filter.value = leaveInfoId;
  return await common.executeQuery(editEmployeeLeaveByLeaveInfoIdQuery);
};

let checkEmployeeExistOrNotByEmployeeId = async (employeeId) => {
  debug("leave.DAL -> checkEmployeeExistOrNotByEmployeeId");
  let checkEmployeeExistOrNotByEmployeeIdQuery = common.cloneObject(query.checkEmployeeExistOrNotByEmployeeIdQuery);
  checkEmployeeExistOrNotByEmployeeIdQuery.filter.value = employeeId;
  return await common.executeQuery(checkEmployeeExistOrNotByEmployeeIdQuery);
};

let leaveCloseByLeaveInfoId = async (leaveInfoId) => {
  debug("leave.DAL -> leaveCloseByLeaveInfoId");
  let leaveCloseByLeaveInfoIdQuery = common.cloneObject(query.leaveCloseByLeaveInfoIdQuery);
  leaveCloseByLeaveInfoIdQuery.filter.value = leaveInfoId;
  return await common.executeQuery(leaveCloseByLeaveInfoIdQuery);
};

let getEmployeeLeaveProviderByLeaveInfoId = async (leaveInfoId) => {
  debug("leave.DAL -> getEmployeeLeaveProviderByLeaveInfoId");
  let getEmployeeLeaveProviderByLeaveInfoIdQuery = common.cloneObject(query.getEmployeeLeaveProviderByLeaveInfoIdQuery);
  getEmployeeLeaveProviderByLeaveInfoIdQuery.filter.value = leaveInfoId;
  return await common.executeQuery(getEmployeeLeaveProviderByLeaveInfoIdQuery);
};

let getEmployeeLeaveEligibilityByLeaveInfoId = async (leaveInfoId) => {
  debug("leave.DAL -> getEmployeeLeaveEligibilityByLeaveInfoId");
  let getEmployeeLeaveEligibilityByLeaveInfoIdQuery = common.cloneObject(query.getEmployeeLeaveEligibilityByLeaveInfoIdQuery);
  getEmployeeLeaveEligibilityByLeaveInfoIdQuery.filter.value = leaveInfoId;
  return await common.executeQuery(getEmployeeLeaveEligibilityByLeaveInfoIdQuery);
};

let removePaperWorkReviewByLeaveInfoId = async (leaveInfoId) => {
  debug("leave.DAL -> removePaperWorkReviewByLeaveInfoId");
  let removePaperWorkReviewByLeaveInfoIdQuery = common.cloneObject(query.removePaperWorkReviewByLeaveInfoIdQuery);
  removePaperWorkReviewByLeaveInfoIdQuery.filter.value = leaveInfoId;
  return await common.executeQuery(removePaperWorkReviewByLeaveInfoIdQuery);
};

let addPaperWorkReview = async (addValueArray) => {
  debug("leave.DAL -> addPaperWorkReview");
  let addPaperWorkReviewQuery = common.cloneObject(query.addPaperWorkReviewQuery);
  addPaperWorkReviewQuery.insert.fValue = addValueArray;
  return await common.executeQuery(addPaperWorkReviewQuery);
};

let getEmployeeLeavePaperWorkReviewDataByClaimNumber = async (claimNumber) => {
  debug("leave.DAL -> getEmployeeLeavePaperWorkReviewDataByClaimNumber");
  let getEmployeeLeavePaperWorkReviewDataByClaimNumberQuery = common.cloneObject(query.getEmployeeLeavePaperWorkReviewDataByClaimNumberQuery);
  getEmployeeLeavePaperWorkReviewDataByClaimNumberQuery.filter.value = claimNumber;
  return await common.executeQuery(getEmployeeLeavePaperWorkReviewDataByClaimNumberQuery);
};

let getEmployeeLeavePaperWorkReviewDocumentDataByClaimNumber = async (claimNumber) => {
  debug("leave.DAL -> getEmployeeLeavePaperWorkReviewDocumentDataByClaimNumber");
  let getEmployeeLeavePaperWorkReviewDocumentDataByClaimNumberQuery = common.cloneObject(query.getEmployeeLeavePaperWorkReviewDocumentDataByClaimNumberQuery);
  getEmployeeLeavePaperWorkReviewDocumentDataByClaimNumberQuery.filter.value = claimNumber;
  return await common.executeQuery(getEmployeeLeavePaperWorkReviewDocumentDataByClaimNumberQuery);
};

let addLeaveDeterminationDecision = async (leaveInfoId, empId, startDate, endDate, leaveTypeStatus) => {
  debug("leave.DAL -> addLeaveDeterminationDecision");
  let addLeaveDeterminationDecisionQuery = common.cloneObject(query.addLeaveDeterminationDecisionQuery);
  addLeaveDeterminationDecisionQuery.insert.fValue = [empId, leaveInfoId, startDate, endDate, leaveTypeStatus];
  return await common.executeQuery(addLeaveDeterminationDecisionQuery);
};

let getEmployeeAndLeaveInfoByLeaveInfoId = async (leaveInfoId) => {
  debug("leave.DAL -> getEmployeeAndLeaveInfoByLeaveInfoId");
  let getEmployeeAndLeaveInfoByLeaveInfoIdQuery = common.cloneObject(query.getEmployeeAndLeaveInfoByLeaveInfoIdQuery);
  getEmployeeAndLeaveInfoByLeaveInfoIdQuery.filter.value = leaveInfoId;
  return await common.executeQuery(getEmployeeAndLeaveInfoByLeaveInfoIdQuery);
};

let addLeaveChronology = async (leaveType, leaveChronologyId, leaveInfoId, data, fk_createdBy) => {
  debug("leave.DAL -> addLeaveChronology");
  let addLeaveChronologyQuery = common.cloneObject(query.addLeaveChronologyQuery);
  addLeaveChronologyQuery.insert.fValue = [leaveType, leaveChronologyId, leaveInfoId, data, fk_createdBy];
  return await common.executeQuery(addLeaveChronologyQuery);
};

let getLeaveChronologyByLeaveInfoId = async (leaveInfoId) => {
  debug("leave.DAL -> getLeaveChronologyByLeaveInfoId");
  let getLeaveChronologyByLeaveInfoIdQuery = common.cloneObject(query.getLeaveChronologyByLeaveInfoIdQuery);
  getLeaveChronologyByLeaveInfoIdQuery.filter.value = leaveInfoId;
  return await common.executeQuery(getLeaveChronologyByLeaveInfoIdQuery);
};

module.exports = {
  addEmployeeDetail: addEmployeeDetail,
  addLocationDetail: addLocationDetail,
  addEmployeeWorkSchedule: addEmployeeWorkSchedule,
  addLeaveInfo: addLeaveInfo,
  addEmployeeLeave: addEmployeeLeave,
  removeEmployeeLeave: removeEmployeeLeave,
  getAllEmployeeLeave: getAllEmployeeLeave,
  getEmployeeLeaveSummaryByEmpId: getEmployeeLeaveSummaryByEmpId,
  getEmployeeLeaveClaimInfoByClaimNumber: getEmployeeLeaveClaimInfoByClaimNumber,
  getEmployeeLeaveClaimInfoServiceByClaimNumber: getEmployeeLeaveClaimInfoServiceByClaimNumber,
  getEmployeeLeavePlanSummaryMaxDurationByClaimNumber: getEmployeeLeavePlanSummaryMaxDurationByClaimNumber,
  getEmployeeLeavePlanStatusByClaimNumber: getEmployeeLeavePlanStatusByClaimNumber,
  editLeaveInfoByLeaveInfoId: editLeaveInfoByLeaveInfoId,
  editEmployeeLeaveByLeaveInfoId: editEmployeeLeaveByLeaveInfoId,
  checkEmployeeExistOrNotByEmployeeId: checkEmployeeExistOrNotByEmployeeId,
  leaveCloseByLeaveInfoId: leaveCloseByLeaveInfoId,
  getEmployeeLeaveProviderByLeaveInfoId: getEmployeeLeaveProviderByLeaveInfoId,
  getEmployeeLeaveEligibilityByLeaveInfoId: getEmployeeLeaveEligibilityByLeaveInfoId,
  removePaperWorkReviewByLeaveInfoId: removePaperWorkReviewByLeaveInfoId,
  addPaperWorkReview: addPaperWorkReview,
  getEmployeeLeavePaperWorkReviewDataByClaimNumber: getEmployeeLeavePaperWorkReviewDataByClaimNumber,
  getEmployeeLeavePaperWorkReviewDocumentDataByClaimNumber: getEmployeeLeavePaperWorkReviewDocumentDataByClaimNumber,
  addLeaveDeterminationDecision: addLeaveDeterminationDecision,
  getEmployeeAndLeaveInfoByLeaveInfoId: getEmployeeAndLeaveInfoByLeaveInfoId,
  addLeaveChronology: addLeaveChronology,
  getLeaveChronologyByLeaveInfoId: getLeaveChronologyByLeaveInfoId,
};

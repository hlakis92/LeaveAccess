let debug = require('debug')('server:api:leave:service');
let DateLibrary = require('date-management');
let leaveRule = require('./leave.rule');
let common = require('../common');
let d3 = require('d3');
let leaveDAL = require('./leave.DAL');
let constant = require('../constant');
let dbDateFormatDOB = constant.appConfig.DB_DATE_FORMAT_DOB;
// let dbDateFormat = constant.appConfig.DB_DATE_FORMAT;


/**
 * Created By: AV
 * Updated By: AV
 *
 * this service use for check leave eligibility
 *
 * @param  {object}  request
 * @return {object}
 *
 */
let checkLeaveEligibilityService = async (request) => {
  debug("leave.service -> checkLeaveEligibilityService");
  let data = request.body;
  data['service_period_in_month'] = parseInt((DateLibrary.getDateDifference(new Date(data['doj']), new Date(), {granularityType: 'days'})) / 30);
  // debug(data);
  let leaveEligibilityList = leaveRule.checkLeaveEligibility(data);
  // debug("leave match", leaveEligibittyList);
  return {status: true, data: leaveEligibilityList}
};

/**
 * Created By: AV
 * Updated By: AV
 *
 * add all employee leave data
 * step 1 to 5
 * employee information
 * location information
 * leave reason
 * leave type
 * provider information
 * leave eligibility
 *
 * @param  {object}  request
 * @return {object}
 *
 */
let addAllDataService = async (request) => {
    debug("leave.service -> addAllDataService");
    let data = common.cloneObject(request.body);
    debug("all data", common.cloneObject(data));
    let userId = request.session.userInfo.userId;
    let employeeInfo = common.cloneObject(data['employeeInfo']);
    let locationInfo = common.cloneObject(data['locationInfo']);
    let leaveReasonInfo = common.cloneObject(data['leaveReasonInfo']);
    let leaveProviderInfo = common.cloneObject(data['leaveProviderInfo']);
    let leaveTypeInfo = common.cloneObject(data['leaveTypeInfo']);
    let leaveEligibilityList = common.cloneObject(data['leaveEligibilityList']);
    let empId = JSON.parse(data['employeeInfo'])['empId'] || 0;
    let locationId = JSON.parse(data['locationInfo'])['empId'] || 0;
    let leaveInfoId = JSON.parse(leaveProviderInfo)['leave_info_id'] || 0;
    let leaveType;
    leaveTypeInfo = JSON.parse(leaveTypeInfo);
    leaveType = leaveTypeInfo['leaveType'];
    if (empId === 0) {
      let employeeInfoResult = await leaveDAL.addEmployeeDetail(employeeInfo);

      if (employeeInfoResult.status === true) {
        empId = employeeInfoResult.content['insertId'];
      }
      let locationId;
      let locationInfoResult = await leaveDAL.addLocationDetail(locationInfo, empId);
      if (employeeInfoResult.status === true) {
        locationId = locationInfoResult.content['insertId'];
      }
      if (locationId !== undefined) {
        await leaveDAL.addEmployeeWorkSchedule(empId, locationId, locationInfo);
      }
    }
    if (leaveInfoId === 0) {
      let leaveInfoResult = await leaveDAL.addLeaveInfo(leaveReasonInfo, leaveProviderInfo, leaveTypeInfo, empId);
      if (leaveInfoResult.status === true) {
        leaveInfoId = leaveInfoResult.content['insertId']
      }
      let addLeaveResult = await leaveDAL.addEmployeeLeave(leaveEligibilityList, empId, leaveInfoId, 'add');
      leaveReasonInfo = JSON.parse(leaveReasonInfo);

      leaveProviderInfo = JSON.parse(leaveProviderInfo);

      let leaveChronologyData1 = {
        leave_name: leaveReasonInfo['leaveReason'],
        leave_type: leaveTypeInfo['leaveType'],
        start_date: leaveTypeInfo['startDate'],
        end_date: leaveTypeInfo['endDate'],
      };
      let addLeaveChronology1 = await leaveDAL.addLeaveChronology(leaveTypeInfo['leaveType'], 1, leaveInfoId, JSON.stringify(leaveChronologyData1), request.session.userInfo.userId)
      let leaveChronologyData2 = {
        name: leaveProviderInfo['providerName'],
        type: leaveProviderInfo['providerType'],
        phone: leaveProviderInfo['providePhone'],
        fax: leaveProviderInfo['provideFax'],
      };
      let addLeaveChronology2 = await leaveDAL.addLeaveChronology(leaveTypeInfo['leaveType'], 10, leaveInfoId, JSON.stringify(leaveChronologyData2), request.session.userInfo.userId)

      debug("employeeInfoResult", empId);
    } else {
      let getOldLeaveEligibility = await leaveDAL.getEmployeeLeaveEligibilityByLeaveInfoId(leaveInfoId);
      let index = 0;
      for (const data of (getOldLeaveEligibility.content)) {
        let isChange = 0, changeType = "";
        let changeData = JSON.parse(leaveEligibilityList)[index];
        if (data['_comment'] === changeData['_comment']) {
          debug((data));
          JSON.parse(data['eligibilityData']).forEach((eData, index) => {
            if (eData['value'] !== changeData['eligibilityData'][index]['value'] && isChange === 0) {
              isChange = 1;
              changeType = changeData['eligibilityData'][index]['value'];
            }
          });
          if (isChange === 1) {
            let leaveChronologyData3 = {
              leave_plan: data['leave_name'],
              update: changeType
            };
            let addLeaveChronology3 = await leaveDAL.addLeaveChronology(leaveTypeInfo['leaveType'], 12, leaveInfoId, JSON.stringify(leaveChronologyData3), request.session.userInfo.userId)
          }
        }
        index++;
      }

      let removeLeaveResult = await leaveDAL.removeEmployeeLeave(leaveInfoId);
// let getLeaveEligibility = await leaveDAL.get
      let editLeaveResult = await leaveDAL.addEmployeeLeave(leaveEligibilityList, empId, leaveInfoId, 'edit');
      let fieldValueUpdate = [{
        field: 'E_userId',
        fValue: userId
      }, {
        field: 'EDate',
        fValue: d3.timeFormat(dbDateFormatDOB)(new Date())
      }];
      await leaveDAL.editLeaveInfoByLeaveInfoId(leaveInfoId, fieldValueUpdate);
    }
    let employeeAndLeaveInfo = await leaveDAL.getEmployeeAndLeaveInfoByLeaveInfoId(leaveInfoId);
    let employeeLeaveProviderInfo = await leaveDAL.getEmployeeLeaveEligibilityByLeaveInfoId(leaveInfoId);
    if (employeeAndLeaveInfo.status === true && employeeAndLeaveInfo.content.length !== 0 && leaveInfoId === 0) {
      let emailData = Object.assign(employeeAndLeaveInfo.content[0], employeeLeaveProviderInfo.content[0]);
      emailData['letter_date'] = common.getDateInUSFormat(d3.timeFormat(dbDateFormatDOB)(new Date()));
      emailData['last_date'] = common.getDateInUSFormat(d3.timeFormat(dbDateFormatDOB)(new Date()));
      let htmlData = common.generatingTemplate(constant.emailTemplates.incompleteLetter, emailData);
      debug(htmlData);
      let sendMail = require("./../../helper/sendmail");
      let fileName = "Leave" + "_" + leaveInfoId + "_" + (new Date()).getTime() + ".pdf";
      let pdfResult = await sendMail.convertHTMLToPDF(htmlData, fileName);
      let attachments = [{   // use URL as an attachment
        filename: fileName,
        path: pdfResult
      }];
      sendMail.sendMail(emailData['email'], "Claim Number: " + leaveInfoId, undefined, "PFA", attachments, result => {
        debug(result);
      });
    }
    return {status: true, data: {leave_id: leaveInfoId, leave_type: leaveType}}
  }
;

/**
 * Created By: AV
 * Updated By: AV
 *
 * get all employee leave list
 *
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

/**
 * Created By: AV
 * Updated By: AV
 *
 * get employee leave summary
 *
 * @param  {object}  request
 * @return {object}
 *
 */
let getEmployeeLeaveSummaryService = async (request) => {
  debug("leave.service -> getEmployeeLeaveService");
  let empId = request.params.empId;
  let employeeLeaveSummaryResult = await leaveDAL.getEmployeeLeaveSummaryByEmpId(empId);
  if (employeeLeaveSummaryResult.status === true) {
    return {status: true, data: employeeLeaveSummaryResult.content}
  } else {
    return {status: false, error: {}}
  }
};

/**
 * Created By: AV
 * Updated By: AV
 *
 * get employee leave claim info
 *
 * @param  {object}  request
 * @return {object}
 *
 */
let getEmployeeLeaveClaimInfoService = async (request) => {
  debug("leave.service -> getEmployeeLeaveClaimInfoService");
  let claimNumber = request.params.claimNumber;
  let employeeLeaveInfoResult = await leaveDAL.getEmployeeLeaveClaimInfoByClaimNumber(claimNumber);
  let employeeLeaveClaimInfoResult = await leaveDAL.getEmployeeLeaveClaimInfoServiceByClaimNumber(claimNumber);
  let employeeLeaveMaximumDurationResult = await leaveDAL.getEmployeeLeavePlanSummaryMaxDurationByClaimNumber(claimNumber);
  let employeeLeavePlanStatusByClaimNumberResult = await leaveDAL.getEmployeeLeavePlanStatusByClaimNumber(claimNumber);
  let employeePaperWorkReviewResult = await leaveDAL.getEmployeeLeavePaperWorkReviewDataByClaimNumber(claimNumber);
  let employeePaperWorkReviewDocumentResult = await leaveDAL.getEmployeeLeavePaperWorkReviewDocumentDataByClaimNumber(claimNumber);
  let employeeTaskListByClaimNumberResult = await leaveDAL.getEmployeeTaskListByClaimNumber(claimNumber);
  let employeeLeaveDeterminationDecisionResult = await leaveDAL.getEmployeeLeaveDeterminationDecisionByClaimNumber(claimNumber);
  if (employeePaperWorkReviewDocumentResult.status === true) {
    (employeePaperWorkReviewDocumentResult.content).forEach(data => {
      data['url'] = constant.appConfig.MEDIA_GET_STATIC_URL + data['url'];
    });
  }
  let employeeLeaveMaximumDurationData;
  if (employeeLeaveMaximumDurationResult.status === true && employeeLeaveMaximumDurationResult.content.length !== 0) {
    employeeLeaveMaximumDurationData = employeeLeaveMaximumDurationResult.content;
    employeeLeaveMaximumDurationData.forEach(data => {
      if (data['maximum_duration'] !== 'Unlimited') {
        let maximumDuration = JSON.parse(data['maximum_duration']);
        if (maximumDuration.granularityType === 'days' && maximumDuration.value === 84) {
          data['total'] = (maximumDuration.value) / 7 * 5 * 8 + " Hours / " + maximumDuration.value / 7 + " Weeks"
          data['usage'] = (maximumDuration.value) / 7 * 5 * 8 + " Hours / " + maximumDuration.value / 7 + " Weeks"
          data['remain'] = (maximumDuration.value) / 7 * 5 * 8 + " Hours / " + maximumDuration.value / 7 + " Weeks"
        }
      } else {
        data['total'] = "-";
        data['usage'] = "-";
        data['remain'] = "-";
      }
    });
  }
  let dateDiff = (employeeLeavePlanStatusByClaimNumberResult.content[0]['date_diff']);

  let leaveDeterminationMatrix = {
    dateDiff: dateDiff,
    pending: 100,
    denied: 0,
    approved: 0,
    not_applicable: 0,
  }
  let leaveDeterminationDecision = [];
  let leavePlanStatus = employeeLeavePlanStatusByClaimNumberResult.content[0];
  if (employeeLeaveDeterminationDecisionResult.status === true
    && employeeLeaveDeterminationDecisionResult.content.length !== 0) {
    let previousDate = leavePlanStatus['from_date'];

    (employeeLeaveDeterminationDecisionResult.content).forEach(data => {
      data['no_of_per'] = ((data['date_diff'] + 1) / dateDiff * 100);
      data['tooltip_data'] = data['startDate'] + "/" + data['endDate'];
      if (previousDate !== undefined) {
        let pDate = new Date(previousDate);
        pDate = new Date(pDate.setDate(pDate.getDate() + 1));
        let sDate = new Date(data['startDate']);
        let eDate = new Date(data['endDate']);
        let newSDate = d3.timeFormat(dbDateFormatDOB)(pDate);
        let newEDate = d3.timeFormat(dbDateFormatDOB)(new Date(sDate.setDate(sDate.getDate() - 1)));
        if (pDate.getTime() < sDate.getTime()) {
          let Object = {
            status: 'pending',
            startDate: newSDate,
            endDate: newEDate,
            date_diff: Math.floor((Date.parse(newEDate) - Date.parse(newSDate)) / 86400000),
            no_of_per: 10,
            tooltip_data: newSDate + '/' + newEDate,
            class: 'progress-bar-warning',
            class2: 'pending1'
          }
          Object['no_of_per'] = ((Object['date_diff'] + 1) / dateDiff * 100);
          leaveDeterminationDecision.push(Object)
        }

      }
      previousDate = data['endDate'];
      if (data['status'] === 'pending') {
        data['class'] = "progress-bar-warning";
        data['class2'] = "pending1";
        leaveDeterminationMatrix['pending'] += ((data['date_diff'] + 1) / dateDiff * 100);
      }
      if (data['status'] === 'denied') {
        data['class'] = "progress-bar-danger";
        data['class2'] = "denied1";
        leaveDeterminationMatrix['denied'] += ((data['date_diff'] + 1) / dateDiff * 100);
      }
      if (data['status'] === 'approved') {
        data['class'] = "progress-bar-success";
        data['class2'] = "approved1";
        leaveDeterminationMatrix['approved'] += ((data['date_diff'] + 1) / dateDiff * 100);
      }
      if (data['status'] === 'notapplicable') {
        data['class'] = "progress-bar-info";
        data['class2'] = "notapplicable1";
        leaveDeterminationMatrix['not_applicable'] += ((data['date_diff'] + 1) / dateDiff * 100);
      }
      leaveDeterminationDecision.push(data);
    });
  } else {
    let leavePlanStatus = employeeLeavePlanStatusByClaimNumberResult.content[0]
    let Object = {
      status: 'pending',
      startDate: leavePlanStatus['from_date'],
      endDate: leavePlanStatus['to_date'],
      date_diff: leavePlanStatus['date_diff'],
      no_of_per: 100,
      tooltip_data: leavePlanStatus['from_date'] + '/' + leavePlanStatus['to_date'],
      class: 'progress-bar-warning',
      class2: 'pending1'
    }
    leaveDeterminationDecision.push(Object);
  }
  debug("....................................", dateDiff);
  debug("....................................", leaveDeterminationDecision);
  leaveDeterminationMatrix['pending'] = (100 - leaveDeterminationMatrix['denied'] - leaveDeterminationMatrix['approved'] - leaveDeterminationMatrix['not_applicable'])
  if (employeeLeaveClaimInfoResult.status === true && employeeLeaveClaimInfoResult.content.length !== 0) {
    return {
      status: true, data: {
        employeeInfo: employeeLeaveInfoResult.content[0],
        leaveInfo: employeeLeaveClaimInfoResult.content[0],
        planMaximumDuration: employeeLeaveMaximumDurationData,
        planStatus: employeeLeavePlanStatusByClaimNumberResult.content,
        paperWorkReview: employeePaperWorkReviewResult.content,
        paperWorkReviewDocument: employeePaperWorkReviewDocumentResult.content,
        taskList: employeeTaskListByClaimNumberResult.content,
        leaveDeterminationMatrix: leaveDeterminationMatrix,
        leaveDeterminationDecision: leaveDeterminationDecision
      }
    }
  } else {
    return {status: false, error: {}}
  }
};

/**
 * Created By: AV
 * Updated By: AV
 *
 * edit leave decision
 * @param  {object}  request
 * @return {object}
 *
 */
let editLeaveDecisionService = async (request) => {
  debug("leave.service -> editLeaveDecisionService");
  let data = common.cloneObject(request.body);
  let leaveInfoId = data['leaveInfoId'];
  let fieldValueUpdateLeaveInfo = [{
    field: 'startDate',
    fValue: data['startDate']
  }, {
    field: 'endDate',
    fValue: data['endDate']
  }, {
    field: 'leaveTypeStatus',
    fValue: data['leaveType']
  }];
  let fieldValueUpdateEmployeeLeave = [{
    field: 'from_date',
    fValue: data['startDate']
  }, {
    field: 'to_date',
    fValue: data['endDate']
  }, {
    field: 'leaveTypeStatus',
    fValue: data['leaveType']
  }];

  await leaveDAL.editLeaveInfoByLeaveInfoId(leaveInfoId, fieldValueUpdateLeaveInfo);
  await leaveDAL.editEmployeeLeaveByLeaveInfoId(leaveInfoId, fieldValueUpdateEmployeeLeave);
  return {status: true, data: {}};
};

/**
 * Created By: AV
 * Updated By: AV
 *
 * add leave determination details decision
 *
 * @param  {object}  request
 * @return {object}
 *
 */
let addLeaveDeterminationDecisionService = async (request) => {
  debug("leave.service -> addLeaveDeterminationDecisionService");
  let data = common.cloneObject(request.body);
  let leaveInfoId = data['leaveInfoId'];
  let empId = data['empId'];
  let startDate = data['startDate'];
  let endDate = data['endDate'];
  let leaveTypeStatus = data['leaveTypeStatus'];
  let userId = request.session.userInfo.userId;
  await leaveDAL.addLeaveDeterminationDecision(leaveInfoId, empId, startDate, endDate, leaveTypeStatus);
  let employeeAndLeaveInfo = await leaveDAL.getEmployeeAndLeaveInfoByLeaveInfoId(leaveInfoId);
  if (leaveTypeStatus === 'approved') {
    let dueDate = DateLibrary.getRelativeDate(new Date(startDate), {
      operationType: "Absolute_DateTime",
      granularityType: "days",
      value: 7
    })
    dueDate = d3.timeFormat(dbDateFormatDOB)(dueDate)
    const taskDAL = require("../task/task.DAL");
    let addTask = taskDAL.addTask(userId, "Decision Task", 0, 'Decision Task Set', empId, leaveInfoId, dueDate, userId);
    let cdata = {
      start_date: common.getDateInUSFormat(startDate),
      end_date: common.getDateInUSFormat(endDate),
      date: common.getDateInUSFormat(dueDate)
    };
    if (employeeAndLeaveInfo.content[0]['leave_type_of_leave'] === 'reducedschedule') {
      let addLeaveChronology = leaveDAL.addLeaveChronology('', 15, leaveInfoId, JSON.stringify(cdata), userId);
    } else {
      let addLeaveChronology = leaveDAL.addLeaveChronology('', 11, leaveInfoId, JSON.stringify(cdata), userId);
    }

  }
  if (leaveTypeStatus === 'denied') {
    let employeeLeaveProviderInfo = await leaveDAL.getEmployeeLeaveEligibilityByLeaveInfoId(leaveInfoId);
    let cdata = {
      start_date: common.getDateInUSFormat(startDate),
      end_date: common.getDateInUSFormat(endDate),
    };
    let addLeaveChronology = leaveDAL.addLeaveChronology('', 13, leaveInfoId, JSON.stringify(cdata), userId);
    if (employeeAndLeaveInfo.status === true && employeeAndLeaveInfo.content.length !== 0) {
      let emailData = Object.assign(employeeAndLeaveInfo.content[0], employeeLeaveProviderInfo.content[0]);
      emailData['letter_date'] = common.getDateInUSFormat(d3.timeFormat(dbDateFormatDOB)(new Date()));
      emailData['reason'] = "-";
      let reason = '' +
        '<th>Eligibility Not Met:<br> \n' +
        '  <ul style="margin-top: 0;" align="left" >\n';
      let found = 0;
      JSON.parse(emailData.eligibilityData).forEach(data => {
        if (data['value'] !== "met") {
          reason += `<li>data['text']</li>`;
          found = 1;
        }
      });
      reason = ` </ul> </th>`;
      if (found === 1) {
        emailData['reason'] = reason;
      }
      let htmlData = common.generatingTemplate(constant.emailTemplates.DeniedLetter, emailData);
      let sendMail = require("./../../helper/sendmail");
      let fileName = "Leave" + "_" + leaveInfoId + "_" + (new Date()).getTime() + ".pdf";
      let pdfResult = await sendMail.convertHTMLToPDF(htmlData, fileName);
      let attachments = [{   // use URL as an attachment
        filename: fileName,
        path: pdfResult
      }];
      sendMail.sendMail(emailData['email'], "Claim Number: " + leaveInfoId, undefined, htmlData, attachments, result => {
        debug(result);
      });

    }

  }
  let fieldValueUpdate = [{
    field: 'D_userId',
    fValue: userId
  }, {
    field: 'DDate',
    fValue: d3.timeFormat(dbDateFormatDOB)(new Date())
  }];
  await leaveDAL.editLeaveInfoByLeaveInfoId(leaveInfoId, fieldValueUpdate);
  return {status: true, data: constant.leaveMessages.MSG_LEAVE_DETERMINATION_DECISION_ADDED_SUCCESSFULLY};
};

/**
 * Created By: AV
 * Updated By: AV
 *
 * check employee already exist or not by employee_id
 *
 * @param  {object}  request
 * @return {object}
 *
 */
let checkEmployeeExistOrNotService = async (request) => {
  debug("leave.service -> checkEmployeeExistOrNotService");
  let data = common.cloneObject(request.body);
  let employeeId = data.employeeId;
  let empId = data.empId;
  debug("............................", empId)
  if (empId > 0) {
    return {
      status: true,
      data: {}
    };
  }
  let result = await leaveDAL.checkEmployeeExistOrNotByEmployeeId(employeeId);
  if (result.status === true && result.content.length > 0) {
    return {
      status: false,
      error: constant.leaveMessages.ERR_IN_EMPLOYEE_ID_ALREADY_EXIST
    };
  } else {
    return {
      status: true,
      data: {}
    };
  }
};

/**
 * Created By: AV
 * Updated By: AV
 *
 * employee leave close by claim_number (leave_info_id)
 *
 * @param  {object}  request
 * @return {object}
 *
 */
let leaveCloseService = async (request) => {
  debug("leave.service -> leaveCloseService");
  let leaveInfoId = request.params.claimNumber;
  let result = await leaveDAL.leaveCloseByLeaveInfoId(leaveInfoId);
  let cdata = {};
  let addLeaveChronology = leaveDAL.addLeaveChronology('', 14, leaveInfoId, JSON.stringify(cdata), request.session.userInfo.userId)
  return {
    status: true,
    data: {}
  };
};

/**
 * Created By: AV
 * Updated By: AV
 *
 * get employee leave provider information by claim_number (leave_info_id)
 *
 * @param  {object}  request
 * @return {object}
 *
 */
let getEmployeeLeaveProviderService = async (request) => {
  debug("leave.service -> getEmployeeLeaveProviderService");
  let leaveInfoId = request.query.claimNumber;
  let result = await leaveDAL.getEmployeeLeaveProviderByLeaveInfoId(leaveInfoId);
  return {
    status: true,
    data: result.content[0]
  };
};

/**
 * Created By: AV
 * Updated By: AV
 *
 * get employee leave eligibility by claim_number (leave_info_id)
 *
 * @param  {object}  request
 * @return {object}
 *
 */
let getEmployeeLeaveEligibilityService = async (request) => {
  debug("leave.service -> getEmployeeLeaveEligibilityService");
  let leaveInfoId = request.query.claimNumber;
  let result = await leaveDAL.getEmployeeLeaveEligibilityByLeaveInfoId(leaveInfoId);
  (result.content).forEach(data => {
    if (data['eligibilityData'] !== null) {
      data['eligibilityData'] = JSON.parse(data['eligibilityData']);
    }
    if (data['qualifying_reason'] !== null) {
      data['qualifying_reason'] = JSON.parse(data['qualifying_reason']);
    }
    if (data['maximum_duration'] !== null) {
      data['maximum_duration'] = JSON.parse(data['maximum_duration']);
    }
  })
  return {
    status: true,
    data: result.content
  };
};

/**
 * Created By: AV
 * Updated By: AV
 *
 * update ERTW and ARTW base on by claim_number (leave_info_id)
 *
 * @param  {object}  request
 * @return {object}
 *
 */
let returnToWorkConfirmationService = async (request) => {
  debug("leave.service -> returnToWorkConfirmationService");
  let leaveInfoId = request.body.leaveInfoId;
  let type = request.body.type; // [ERTW | ARTW]
  let fieldValueUpdate;
  if (type === "ERTW") {
    fieldValueUpdate = [{
      field: 'ERTW_userId',
      fValue: request.body['ERTW_userId']
    }, {
      field: 'ERTWDate',
      fValue: request.body['ERTWDate']
    }]
  } else if (type === "ARTW") {
    fieldValueUpdate = [{
      field: 'ARTW_userId',
      fValue: request.body['ARTW_userId']
    }, {
      field: 'ARTWDate',
      fValue: request.body['ARTWDate']
    }]
  }
  let result = await leaveDAL.editLeaveInfoByLeaveInfoId(leaveInfoId, fieldValueUpdate);
  if (result.status == true) {
    let getEmployeeInfo = await leaveDAL.getEmployeeAndLeaveInfoByLeaveInfoId(leaveInfoId);
    if (getEmployeeInfo.status === true && getEmployeeInfo.content.length !== 0) {
      let emailData = getEmployeeInfo.content[0];
      let htmlData = "";
      emailData['letter_date'] = common.getDateInUSFormat(d3.timeFormat(dbDateFormatDOB)(new Date()));
      if (type === "ERTW") {
        emailData['ERTWDate'] = common.getDateInUSFormat(request.body['ERTWDate']);
        htmlData = common.generatingTemplate(constant.emailTemplates.ERTWLetter, emailData);
      } else {
        emailData['ARTWDate'] = common.getDateInUSFormat(request.body['ARTWDate']);
        htmlData = common.generatingTemplate(constant.emailTemplates.ARTWLetter, emailData);
      }
      let sendMail = require("./../../helper/sendmail");
      let fileName = type + "_" + leaveInfoId + "_" + (new Date()).getTime() + ".pdf";
      let pdfResult = await sendMail.convertHTMLToPDF(htmlData, fileName);
      let attachments = [{   // use URL as an attachment
        filename: fileName,
        path: pdfResult
      }]
      sendMail.sendMail(emailData['email'], "email template", undefined, "PFA", attachments, result => {
        debug(result);
      });
    }
  }
  let successMessage = constant.leaveMessages.MSG_RETURN_TO_WORK_CONFIRMATION_ADDED_SUCCESSFULLY;
  successMessage.message = common.generatingTemplate(successMessage.message, {type: type});
  return {
    status: true,
    data: successMessage,
  };
};

/**
 * Created By: AV
 * Updated By: AV
 *
 * add employee leave paper work review by claim_number (leave_info_id)
 *
 * @param  {object}  request
 * @return {object}
 *
 */
let paperWorkReviewService = async (request) => {
  debug("leave.service -> paperWorkReviewService");
  let userId = request.session.userInfo.userId;
  let leaveInfoId = request.body.leaveInfoId;
  let paperWorkDataSelected = (request.body.paperWorkDataSelected).split(",");
  let paperWorkDataUnSelected = (request.body.paperWorkDataUnSelected).split(",");
  let addValueArray = [];
  paperWorkDataSelected.forEach(data => {
    if (data !== "") {
      addValueArray.push([leaveInfoId, data, 1]);
    }
  });
  paperWorkDataUnSelected.forEach(data => {
    if (data !== "") {
      addValueArray.push([leaveInfoId, data, 0]);
    }
  });
  await leaveDAL.removePaperWorkReviewByLeaveInfoId(leaveInfoId);
  await leaveDAL.addPaperWorkReview(addValueArray);
  let date = d3.timeFormat(dbDateFormatDOB)(new Date())
  let fieldValueUpdate = [{
    field: 'PR_userId',
    fValue: userId
  }, {
    field: 'PRDate',
    fValue: date
  }]
  await leaveDAL.editLeaveInfoByLeaveInfoId(leaveInfoId, fieldValueUpdate);

  return {
    status: true,
    data: constant.leaveMessages.MSG_PAPER_WORK_REVIEW_UPDATED_SUCCESSFULLY
  }
};

/**
 * Created By: AV
 * Updated By: AV
 *
 * get employee leave chronology by claim_number (leave_info_id)
 *
 * @param  {object}  request
 * @return {object}
 *
 */
let getLeaveChronologyServiceService = async (request) => {
  debug("leave.service -> getLeaveChronologyServiceService");
  let leaveInfoId = request.params.claimNumber;
  let result = await leaveDAL.getLeaveChronologyByLeaveInfoId(leaveInfoId);
  if (result.status === true) {
    (result.content).forEach(data => {
      data['info'] = common.generatingTemplate(data['processTemplate'], JSON.parse(data['data']));
    })
  }
  return {
    status: true,
    data: result.content
  };
};

/**
 * Created By: AV
 * Updated By: AV
 *
 *
 *
 * @param  {object}  request
 * @return {object}
 *
 */
let intermittentParameterService = async (request) => {
  debug("leave.service -> paperWorkReviewService");
  let userId = request.session.userInfo.userId;
  let leaveInfoId = request.body.leaveInfoId;
  let flareUpsParams = request.body.flareUpsParams;
  let officeVisitsParams = request.body.officeVisitsParams;
  let fieldValueUpdate = [{
    field: 'flare_ups_param',
    fValue: flareUpsParams
  }, {
    field: 'office_visits_param',
    fValue: officeVisitsParams
  }]
  await leaveDAL.editLeaveInfoByLeaveInfoId(leaveInfoId, fieldValueUpdate);

  return {
    status: true,
    data: constant.leaveMessages.MSG_LEAVE_INTERMITTENT_PARAMETER_ADDED_SUCCESSFULLY
  }
};

/**
 * Created By: AV
 * Updated By: AV
 *
 *
 *
 * @param  {object}  request
 * @return {object}
 *
 */
let intermittentTimeService = async (request) => {
  debug("leave.service -> intermittentTimeService");
  let userId = request.session.userInfo.userId;
  let leaveInfoId = request.body.leaveInfoId;
  let param = request.body.param;
  let date = request.body.date;
  let hours = request.body.hours;
  let status = request.body.status;
  let comment = request.body.comment;

  await leaveDAL.removeIntermittentTimeByLeveInfoIdAndDate(leaveInfoId, date);
  await leaveDAL.addIntermittentTime([leaveInfoId, param, date, hours, status, comment]);

  return {
    status: true,
    data: constant.leaveMessages.MSG_LEAVE_INTERMITTENT_TIME_ADDED_SUCCESSFULLY
  }
};

/**
 * Created By: AV
 * Updated By: AV
 *
 *
 *
 * @param  {object}  request
 * @return {object}
 *
 */
let getIntermittentTimeService = async (request) => {
  debug("leave.service -> getIntermittentTimeService");
  let userId = request.session.userInfo.userId;
  let leaveInfoId = request.params.leaveInfoId;
  let date = request.params.date;

  let result = await leaveDAL.getIntermittentTimeByLeveInfoIdAndDate(leaveInfoId, date);
  debug(".....................", result)
  if (result.status === true && result.content.length !== 0) {
    return {
      status: true,
      data: result.content[0]
    }
  } else {
    return {
      status: false,
      error: constant.leaveMessages.MSG_LEAVE_INTERMITTENT_TIME_ADDED_SUCCESSFULLY
    }
  }


};

module.exports = {
  checkLeaveEligibilityService: checkLeaveEligibilityService,
  addAllDataService: addAllDataService,
  getEmployeeLeaveService: getEmployeeLeaveService,
  getEmployeeLeaveSummaryService: getEmployeeLeaveSummaryService,
  getEmployeeLeaveClaimInfoService: getEmployeeLeaveClaimInfoService,
  editLeaveDecisionService: editLeaveDecisionService,
  addLeaveDeterminationDecisionService: addLeaveDeterminationDecisionService,
  checkEmployeeExistOrNotService: checkEmployeeExistOrNotService,
  leaveCloseService: leaveCloseService,
  getEmployeeLeaveProviderService: getEmployeeLeaveProviderService,
  getEmployeeLeaveEligibilityService: getEmployeeLeaveEligibilityService,
  returnToWorkConfirmationService: returnToWorkConfirmationService,
  paperWorkReviewService: paperWorkReviewService,
  getLeaveChronologyServiceService: getLeaveChronologyServiceService,
  intermittentParameterService: intermittentParameterService,
  intermittentTimeService: intermittentTimeService,
  getIntermittentTimeService: getIntermittentTimeService,
};

/*async function convertHTMLToPDF(htmlData, fileName) {
  let path = "";
  let html = "<h1>Hello</h1>";
  const pdf = require('html-pdf');
  let fileResult = await new Promise((resolve) => {
    pdf.create(html).toFile(path + fileName, resolve);
  });
  return fileResult;
}

// k();
async function k() {

  let result = await convertHTMLToPDF("<h1>Welcome</h1>", "find.pdf");
  debug(result);
}*/

/*let sendMail = require("./../../helper/sendmail");
let attachments = [{   // use URL as an attachment
  filename: 'find.pdf',
  path: 'find.pdf'
},]
sendMail.sendMail("asys.vaghasiya@gmail.com", "hello2 ,....", undefined, "htmlData", attachments, result => {
  debug(result);
});*/

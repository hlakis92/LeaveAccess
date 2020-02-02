var debug = require('debug')('server:api:task:service');
var d3 = require("d3");
var md5 = require('md5');
var uuid = require('uuid');
// let speakeasy = require('speakeasy');
var DateLibrary = require('date-management');
var randomstring = require("randomstring");
// let libphonenumber = require('libphonenumber-js');
var common = require('../common');
var constant = require('../constant');
var taskDAL = require('./task.DAL');
// var sendSMSObj = require('../../helper/sendsms');
var dbDateFormat = constant.appConfig.DB_DATE_FORMAT;
// var config = require('../../../../config');
var async = require("async");
// let ruleParser = require('rule-parser-engine');


/**
 * Created By: MB
 * Updated By: MB
 *
 * Task List service
 * @param  {object}  request
 * @return {object}
 *
 */
let getTaskListService = async (request) => {
  debug("task.service -> getTaskListService");
  let getTaskListResult = await taskDAL.getTaskList();
  if (getTaskListResult.status === true && getTaskListResult.content.length !== 0) {
    return {status: true, data: getTaskListResult.content};
  } else {
    return {status: false, error: constant.taskMessages.NO_RECORD_FOUND};
  }

};

/**
 * Created By: MB
 * Updated By: MB
 *
 * Task List service
 * @param  {object}  request
 * @return {object}
 *
 */
/*let getManagerService = async (request) => {
  debug("task.service -> getManagerService");
  
  let getManagerResult = await taskDAL.getManagerList();
  if (getManagerResult.status === true && getManagerResult.content.length !== 0) {
    return {status: true, data: getManagerResult.content};
  } else {
    return {status: false, error: constant.taskMessages.NO_RECORD_FOUND};
  }
};*/

/**
 * Created By: MB
 * Updated By: MB
 *
 * Get Task service
 * @param  {object}  request
 * @return {object}
 *
 */
/*let getTaskService = async (request) => {
  debug("task.service -> getTaskService");
  let id = request.params.id;  
  let getTaskResult = await taskDAL.getTask(id);

  if (getTaskResult.status === true && getTaskResult.content.length !== 0) {
    return {status: true, data: getTaskResult.content[0]};
  } else {
    return {status: false, error: constant.taskMessages.NO_RECORD_FOUND};
  }
};*/
/**
 * Created By: MB
 * Updated By: MB
 *
 * Add Task service
 * @param  {object}  request
 * @return {object}
 *
 */
let addTaskService = async (request) => {
  debug("task.service -> addTaskService");
  if (request.body.taskName === undefined || request.body.userId === undefined) {
    return {
      status: false,
      error: constant.requestMessages.TASK_ERROR
    };
  }
  let userId = request.body.userId;
  let taskName = request.body.taskName;
  let status = request.body.status;
  let taskDesc = request.body.taskDesc;
  let empId = request.body.empId;
  let leaveInfoId = request.body.leaveInfoId;
  let dueDate = request.body.dueDate;

  let modifyBy = request.session.userInfo.userId;
  let addTaskResult = await taskDAL.addTask(userId, taskName, status, taskDesc, empId, leaveInfoId,dueDate, modifyBy);
  if (addTaskResult.status === true) {
    return {
      status: true,
      data: constant.taskMessages.TASK_ADDDED
    };
  } else {
    return {status: false, error: constant.taskMessages.TASK_ERROR};
  }
};

/**
 * Created By: MB
 * Updated By: MB
 *
 * Note List service
 * @param  {object}  request
 * @return {object}
 *
 */
let getNotesListService = async (request) => {
  debug("task.service -> getNotesListService");
  let getNotesListResult = await taskDAL.getNotesList();
  if (getNotesListResult.status === true && getNotesListResult.content.length !== 0) {
    return {status: true, data: getNotesListResult.content};
  } else {
    return {status: false, error: constant.taskMessages.NO_RECORD_FOUND};
  }

};

/**
 * Created By: MB
 * Updated By: MB
 *
 * Add Note service
 * @param  {object}  request
 * @return {object}
 *
 */
let addNotesService = async (request) => {
  debug("task.service -> addNotesService");
  if (request.body.notes === undefined) {
    return {
      status: false,
      error: constant.requestMessages.NOTES_ERROR
    };
  }
   let notes = request.body.notes;
  let empId = request.body.empId;
  let leaveInfoId = request.body.leaveInfoId;

  let userId = request.session.userInfo.userId;
  let modifyBy = userId;
  let addNotesResult = await taskDAL.addNotes(notes, empId, leaveInfoId, userId, modifyBy);
  if (addNotesResult.status === true) {
    return {
      status: true,
      data: constant.taskMessages.NOTES_ADDDED
    };
  } else {
    return {status: false, error: constant.taskMessages.NOTES_ERROR};
  }
};


/**
 * Created By: MB
 * Updated By: MB
 *
 * Update Task service
 * @param  {object}  request
 * @return {object}
 *
 */

/*let taskUpdateService = async (request) => {
  debug("task.service -> taskUpdateService");
  let id = request.body.task_id;  
 // console.log(request.body.password);
 // console.log(request.body.status);
  let fieldValueUpdate = [{
      field: 'name',
      fValue: request.body.name
    },{
      field: 'email',
      fValue: request.body.email
    },
    {
      field: 'tasktype',
      fValue: request.body.tasktype
    },
    {
      field: 'status',
      fValue: request.body.status
    }];
    if(request.body.password != '' && request.body.password != undefined )
    {
      fieldValueUpdate.push({
        field: 'password',
       // encloseValue: false,
        fValue: md5(request.body.password),
      });
    }
  let filter = {and:[{
      field: 'pk_taskID',
      operator: 'NotEQ',
      value: id    

    },{
      field: 'email',
      operator: 'EQ',
      value: request.body.email
    }]};
  let checkTaskResult = await taskDAL.checkTaskExist(filter);
  if (checkTaskResult.status === true && checkTaskResult.content.length !== 0) {
    return {status: false, error: constant.taskMessages.USER_ALREADY_EXIST};
  }

  let updateTaskResult = await taskDAL.updateTask(id,fieldValueUpdate);
  if (updateTaskResult.status === true) {
    return {
      status: true,
      data: constant.taskMessages.USER_UPDATED
    };
  } else {
    return {status: false, error: constant.taskMessages.USER_ERROR};
  }
};*/
/**
 * Created By: MB
 * Updated By: MB
 *
 * Delete Task service
 * @param  {object}  request
 * @return {object}
 *
 */
/*let taskDeleteService = async (request) => {
  debug("task.service -> taskDeleteService");
  let id = request.body.id;  
  let deleteTaskResult = await taskDAL.deleteTask(id);

  if (deleteTaskResult.status === true) {
    return {
      status: true,
      data: constant.taskMessages.USER_DELETED
    };
  } else {
    return {status: false, error: constant.taskMessages.USER_ERROR};
  }
};*/
module.exports = {
  getTaskListService: getTaskListService,
 // getTaskService: getTaskService,
  addTaskService:addTaskService,
  getNotesListService: getNotesListService,
 // taskUpdateService: taskUpdateService,
  //taskDeleteService: taskDeleteService,
 // getManagerService: getManagerService,
  addNotesService:addNotesService
};
// console.log(DateLibrary.getWeekNumber(new Date()),'Week_of_Year')



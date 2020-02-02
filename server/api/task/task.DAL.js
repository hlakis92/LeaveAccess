let debug = require('debug')('server:api:task:DAL');
let d3 = require("d3");
let DateLibrary = require('date-management');
let common = require('../common');
let constant = require('../constant');
let query = require('./task.query');
let dbDateFormat = constant.appConfig.DB_DATE_FORMAT;


let addTask = async (userId, taskName, status, taskDesc, empId, leaveInfoId,dueDate, modifyBy) => {
  debug("task.DAL -> addTask");
  let addTaskQuery = common.cloneObject(query.addTaskQuery);
  addTaskQuery.insert.fValue = [userId, taskName, status, taskDesc, empId, leaveInfoId,dueDate, modifyBy];
  return await common.executeQuery(addTaskQuery);
};

let getTaskList = async () => {
  debug("task.DAL -> getTaskList");
  let getTaskListQuery = common.cloneObject(query.getTaskListQuery);
  return await common.executeQuery(getTaskListQuery);
};

let addNotes = async (notes, empId, leaveInfoId, userId, modifyBy) => {
  debug("task.DAL -> addNotes");
  let addNotesQuery = common.cloneObject(query.addNotesQuery);
  addNotesQuery.insert.fValue = [userId, notes, empId, leaveInfoId, modifyBy];
  return await common.executeQuery(addNotesQuery);
};

let getNotesList = async () => {
  debug("task.DAL -> getNotesList");
  let getNotesListQuery = common.cloneObject(query.getNotesListQuery);
  return await common.executeQuery(getNotesListQuery);
};
/*let getManagerList = async () => {
  debug("task.DAL -> getManagerList");
  let getManagerListQuery = common.cloneObject(query.getManagerListQuery);
  return await common.executeQuery(getManagerListQuery);
};


let getTask = async (id) => {
  debug("task.DAL -> getTask");
  let getTaskQuery = common.cloneObject(query.getTaskQuery);
  // getTaskQuery.filter.value = id;
  return await common.executeQuery(getTaskQuery);
};

let updateTask = async (id, fieldValueUpdate) => {
  debug("task.DAL -> updateTask");
  let updateTaskQuery = common.cloneObject(query.updateTaskQuery);
  updateTaskQuery.update= fieldValueUpdate 
   updateTaskQuery.filter.value = id;
  return await common.executeQuery(updateTaskQuery);
};

let deleteTask = async (id) => {
  debug("task.DAL -> deleteTask");
  let deleteTaskQuery = common.cloneObject(query.deleteTaskQuery);
   deleteTaskQuery.filter.value = id;
  return await common.executeQuery(deleteTaskQuery);
};*/

module.exports = {
  addTask: addTask,
  getTaskList: getTaskList,
  addNotes:addNotes,
  getNotesList:getNotesList
  /*getManagerList: getManagerList,
  getTask: getTask,
  updateTask:updateTask,
  deleteTask: deleteTask*/
};
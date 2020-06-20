let debug = require('debug')('server:api:task:controller');
let taskService = require('./task.service');
let constant = require('../constant');

/**
 * Created By: MB
 * Updated By: MB
 *
 * @param  {object} request
 * @param  {object} response
 * @return {object}
 */
let tasks = async (request, response) => {
  debug("task.controller -> tasks");
  let result = await taskService.getTaskListService(request);
  return response.send(result);
};

let addtask = async (request, response) => {
  debug("task.controller -> addtask");
  let result = await taskService.addTaskService(request);
  return response.send(result);
};

let updateTask = async (request, response) => {
  debug("task.controller -> updateTask");
  let result = await taskService.updateTaskService(request);
  return response.send(result);
};

/*let updatetask = async (request, response) => {
  debug("task.controller -> updatetask");
  let result = await taskService.taskUpdateService(request);
  return response.send(result);
};

let deletetask = async (request, response) => {
  debug("task.controller -> deletetask");
  let result = await taskService.taskDeleteService(request);
  return response.send(result);
};*/

let notes = async (request, response) => {
  debug("task.controller -> notes");
  let result = await taskService.getNotesListService(request);
  return response.send(result);
};
let addnotes = async (request, response) => {
  debug("task.controller -> addnotes");
  let result = await taskService.addNotesService(request);
  return response.send(result);
};
let editnotes = async (request, response) => {
  debug("task.controller -> editnotes");
  let result = await taskService.editNotesService(request);
  return response.send(result);
};
module.exports = {
  tasks: tasks,
  addtask: addtask,
  updateTask: updateTask,
  //deletetask: deletetask,
  notes: notes,
  addnotes: addnotes,
  editnotes: editnotes
};
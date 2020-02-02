let debug = require('debug')('server:api:user:controller');
let userService = require('./user.service');
let constant = require('../constant');

/**
 * Created By: AV
 * Updated By: AV
 *
 * Creating New User
 *
 * @param  {object} request
 * @param  {object} response
 * @return {object}
 */
let signup = async (request, response) => {
  debug("user.controller -> singup");
  if (request.body !== undefined && typeof request.body === "object") {
    let result = userService.signupService(request);
    response.status = 201;
    response.send(result);
  } else {
    return response.send({
      status: false,
      error: constant.requestMessages.ERR_INVALID_SIGNUP_REQUEST
    });
  }
};

/**
 * Created By: AV
 * Updated By: AV
 *
 * Creating New User
 *
 * @param  {object} request
 * @param  {object} response
 * @return {object}
 */
let signin = async (request, response) => {
  debug("user.controller -> signin");
  if (request.body !== undefined && typeof request.body === "object") {
    let result = await userService.signinService(request);
    response.status = 201;
    return response.send(result);
  } else {
    return response.send({
      status: false,
      error: constant.requestMessages.ERR_INVALID_SIGNUP_REQUEST
    });
  }
};

/**
 * Created By: AV
 * Updated By: AV
 *
 * logout
 *
 * @param  {object} request
 * @param  {object} response
 * @return {object}
 */
let logout = async (request, response) => {
  debug("user.controller -> logout");
  let result = await userService.logoutService(request);
  return response.send(result);
};

/**
 * Created By: MB
 * Updated By: MB
 *
 * @param  {object} request
 * @param  {object} response
 * @return {object}
 */
let users = async (request, response) => {
  debug("user.controller -> users");
  let result = await userService.getUserListService(request);
  return response.send(result);
};

let adduser = async (request, response) => {
  debug("user.controller -> adduser");
  let result = await userService.addUserService(request);
  return response.send(result);
};

let updateuser = async (request, response) => {
  debug("user.controller -> updateuser");
  let result = await userService.userUpdateService(request);
  return response.send(result);
};

let deleteuser = async (request, response) => {
  debug("user.controller -> deleteuser");
  let result = await userService.userDeleteService(request);
  return response.send(result);
};

module.exports = {
  signup: signup,
  signin: signin,
  logout: logout,
  users: users,
  adduser: adduser,
  updateuser: updateuser,
  deleteuser: deleteuser
};
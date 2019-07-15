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

module.exports = {
  signup: signup,
  signin: signin,
};
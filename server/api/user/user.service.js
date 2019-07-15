var debug = require('debug')('server:api:user:service');
var d3 = require("d3");
var md5 = require('md5');
var uuid = require('uuid');
// let speakeasy = require('speakeasy');
var DateLibrary = require('date-management');
var randomstring = require("randomstring");
// let libphonenumber = require('libphonenumber-js');
var common = require('../common');
var constant = require('../constant');
var userDAL = require('./user.DAL');
// var sendSMSObj = require('../../helper/sendsms');
var dbDateFormat = constant.appConfig.DB_DATE_FORMAT;
// var config = require('../../../../config');
var async = require("async");
// let ruleParser = require('rule-parser-engine');

/**
 * Created By: AV
 * Updated By: AV
 *
 * signup service
 * @param  {object}  request
 * @return {object}
 *
 */
let signupService = async (request) => {
  debug("user.service -> signupService");
  if (request.body.username === undefined || request.body.password === undefined
    || request.body.email === undefined) {
    return {
      status: false,
      error: constant.requestMessages.ERR_INVALID_SIGNUP_REQUEST
    };
  }

  let signupResult = await userDAL.addUser(userName, email, password);

};

/**
 * Created By: AV
 * Updated By: AV
 *
 * signin service
 * @param  {object}  request
 * @return {object}
 *
 */
let signinService = async (request) => {
  debug("user.service -> signinService");
  if (request.body.email === undefined || request.body.password === undefined) {
    return {
      status: false,
      error: constant.requestMessages.ERR_INVALID_SIGNUP_REQUEST
    };
  }
  let email = request.body.email;
  let password = md5(request.body.password);

  let signinResult = await userDAL.userLogin(email, password);
  if (signinResult.status === true && signinResult.content.length !== 0) {
    return {status: true, data: constant.userMessages.MSG_SIGNIN_SUCCESSFULLY};
  } else {
    return {status: false, error: constant.userMessages.ERR_IN_SIGNIN};
  }
};

module.exports = {
  signupService: signupService,
  signinService: signinService
};

// console.log(DateLibrary.getWeekNumber(new Date()),'Week_of_Year')



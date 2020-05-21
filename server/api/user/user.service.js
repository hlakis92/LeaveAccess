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
 * sign in / login for user
 *
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

  let deviceId = request.headers["udid"];
  let expiryDateTime = DateLibrary.getRelativeDate(new Date(), {
    operationType: "Absolute_DateTime",
    granularityType: "hours",
    value: constant.appConfig.MAX_ACCESS_TOKEN_EXPIRY_HOURS
  });
  let token = uuid.v1();
  let email = request.body.email;
  let password = md5(request.body.password);

  let signinResult = await userDAL.userLogin(email, password);
  if (signinResult.status === true && signinResult.content.length !== 0) {
    request.session.userInfo = signinResult.content[0];
    let userId = signinResult.content[0]['userId'];
    await userDAL.expireAccessToken(deviceId, token);
    await userDAL.addAccessToken(userId, deviceId, token, expiryDateTime);
    return {status: true, "access_token": token, data: constant.userMessages.MSG_SIGNIN_SUCCESSFULLY};
  } else {
    return {status: false, error: constant.userMessages.ERR_IN_SIGNIN};
  }
};

/**
 * Created By: AV
 * Updated By: AV
 *
 * logout form site
 * @param  {object}  request
 * @return {object}
 *
 */
let logoutService = async (request) => {
  debug("user.service -> logoutService");
  let deviceId = request.headers["udid"];
  let token = request.headers["token"];
  await userDAL.expireAccessToken(deviceId, token);
  // debug("............................",request.session.userInfo)
  request.session.destroy();
  // debug("............................",request.session.userInfo)
  return {status: true, data: {}}
};


/**
 * Created By: MB
 * Updated By: MB
 *
 * get user list
 *
 * @param  {object}  request
 * @return {object}
 *
 */
let getUserListService = async (request) => {
  debug("user.service -> getUserListService");

  let getUserListResult = await userDAL.getUserList();
  if (getUserListResult.status === true && getUserListResult.content.length !== 0) {
    return {status: true, data: getUserListResult.content};
  } else {
    return {status: false, error: constant.userMessages.NO_RECORD_FOUND};
  }
};

/**
 * Created By: MB
 * Updated By: MB
 *
 * get mangers list
 *
 * @param  {object}  request
 * @return {object}
 *
 */
let getManagerService = async (request) => {
  debug("user.service -> getManagerService");
  //let userId = request.session.userInfo.userId;
  //console.log('================'+ userId);
  let getManagerResult = await userDAL.getManagerList();
  if (getManagerResult.status === true && getManagerResult.content.length !== 0) {
    return {status: true, data: getManagerResult.content};
  } else {
    return {status: false, error: constant.userMessages.NO_RECORD_FOUND};
  }
};

/**
 * Created By: MB
 * Updated By: MB
 *
 * Get User service
 * @param  {object}  request
 * @return {object}
 *
 */
let getUserService = async (request) => {
  debug("user.service -> getUserService");
  let id = request.params.id;
  let getUserResult = await userDAL.getUser(id);

  if (getUserResult.status === true && getUserResult.content.length !== 0) {
    return {status: true, data: getUserResult.content[0]};
  } else {
    return {status: false, error: constant.userMessages.NO_RECORD_FOUND};
  }
};
/**
 * Created By: MB
 * Updated By: MB
 *
 * Add new user
 *
 * @param  {object}  request
 * @return {object}
 *
 */
let addUserService = async (request) => {
  debug("user.service -> addUserService");
  if (request.body.name === undefined || request.body.password === undefined
    || request.body.email === undefined) {
    return {
      status: false,
      error: constant.requestMessages.ERR_INVALID_SIGNUP_REQUEST
    };
  }
  let name = request.body.name;
  let email = request.body.email;
  let usertype = request.body.usertype;
  let password = md5(request.body.password);

  let filter = {
    field: 'email',
    operator: 'EQ',
    value: request.body.email
  };
  let checkUserResult = await userDAL.checkUserExist(filter);
  if (checkUserResult.status === true && checkUserResult.content.length !== 0) {
    return {status: false, error: constant.userMessages.USER_ALREADY_EXIST};
  }

  let addUserResult = await userDAL.addUser(name, email, usertype, password);
  if (addUserResult.status === true) {
    return {
      status: true,
      data: constant.userMessages.USER_ADDDED
    };
  } else {
    return {status: false, error: constant.userMessages.USER_ERROR};
  }
};

/**
 * Created By: MB
 * Updated By: MB
 *
 * Update User service
 * @param  {object}  request
 * @return {object}
 *
 */

let userUpdateService = async (request) => {
  debug("user.service -> userUpdateService");
  let id = request.body.user_id;
  // console.log(request.body.password);
  // console.log(request.body.status);
  let fieldValueUpdate = [{
    field: 'name',
    fValue: request.body.name
  }, {
    field: 'email',
    fValue: request.body.email
  },
    {
      field: 'usertype',
      fValue: request.body.usertype
    },
    {
      field: 'status',
      fValue: request.body.status
    }];
  if (request.body.password != '' && request.body.password != undefined) {
    fieldValueUpdate.push({
      field: 'password',
      // encloseValue: false,
      fValue: md5(request.body.password),
    });
  }
  let filter = {
    and: [{
      field: 'pk_userID',
      operator: 'NotEQ',
      value: id

    }, {
      field: 'email',
      operator: 'EQ',
      value: request.body.email
    }]
  };
  let checkUserResult = await userDAL.checkUserExist(filter);
  if (checkUserResult.status === true && checkUserResult.content.length !== 0) {
    return {status: false, error: constant.userMessages.USER_ALREADY_EXIST};
  }

  let updateUserResult = await userDAL.updateUser(id, fieldValueUpdate);
  if (updateUserResult.status === true) {
    return {
      status: true,
      data: constant.userMessages.USER_UPDATED
    };
  } else {
    return {status: false, error: constant.userMessages.USER_ERROR};
  }
};
/**
 * Created By: MB
 * Updated By: MB
 *
 * Delete User service
 * @param  {object}  request
 * @return {object}
 *
 */
let userDeleteService = async (request) => {
  debug("user.service -> userDeleteService");
  let id = request.body.id;
  let deleteUserResult = await userDAL.deleteUser(id);

  if (deleteUserResult.status === true) {
    return {
      status: true,
      data: constant.userMessages.USER_DELETED
    };
  } else {
    return {status: false, error: constant.userMessages.USER_ERROR};
  }
};
module.exports = {
  signupService: signupService,
  signinService: signinService,
  logoutService: logoutService,
  getUserListService: getUserListService,
  getUserService: getUserService,
  addUserService: addUserService,
  userUpdateService: userUpdateService,
  userDeleteService: userDeleteService,
  getManagerService: getManagerService
};

// let sendMail = require("./../../helper/sendmail");
// sendMail.sendMail("asys.vaghasiya@gmail.com", "hello ,....", undefined, "htmlData", result=>{
//   debug(result);
// });



let debug = require('debug')('server:api:user:DAL');
let d3 = require("d3");
let DateLibrary = require('date-management');
let common = require('../common');
let constant = require('../constant');
let query = require('./user.query');
let dbDateFormat = constant.appConfig.DB_DATE_FORMAT;

let checkUserIsExist = (countryCode, mobile, cb) => {
  debug("user.DAL -> checkUserIsExist");
  let checkUserIsExistQuery = common.cloneObject(query.checkUserIsExistQuery);
  checkUserIsExistQuery.filter.and[0].value = countryCode;
  checkUserIsExistQuery.filter.and[1].value = mobile;
  common.executeQuery(checkUserIsExistQuery, cb);
};

let addUser = async (username, email, password) => {
  debug("user.DAL -> addUser");
  let addUserQuery = common.cloneObject(query.addUserQuery);
  addUserQuery.insert.fValue = [username, email, password];
  return await common.executeQuery(addUserQuery);
};

let userLogin = async (email, password) => {
  debug("user.DAL -> userLogin");
  let userLoginQuery = common.cloneObject(query.userLoginQuery);
  userLoginQuery.filter.and[0].value = email;
  userLoginQuery.filter.and[1].value = password;
  return await common.executeQuery(userLoginQuery);
};

module.exports = {
  checkUserIsExist: checkUserIsExist,
  addUser: addUser,
  userLogin: userLogin
};
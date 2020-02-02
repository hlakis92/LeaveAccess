let debug = require('debug')('server:api:user:DAL');
let d3 = require("d3");
let DateLibrary = require('date-management');
let common = require('../common');
let constant = require('../constant');
let query = require('./user.query');
let dbDateFormat = constant.appConfig.DB_DATE_FORMAT;

// This function is used to check Employee.
let checkUserIsExist = (countryCode, mobile, cb) => {
  debug("user.DAL -> checkUserIsExist");
  let checkUserIsExistQuery = common.cloneObject(query.checkUserIsExistQuery);
  checkUserIsExistQuery.filter.and[0].value = countryCode;
  checkUserIsExistQuery.filter.and[1].value = mobile;
  common.executeQuery(checkUserIsExistQuery, cb);
};

// This fucntion used to check duplicate user.
let checkUserExist = async (filter) => {
  debug("user.DAL -> checkUserExist");
  let checkUserExistQuery = common.cloneObject(query.checkUserExistQuery);
  checkUserExistQuery.filter = filter;
  return await common.executeQuery(checkUserExistQuery);
};

let userLogin = async (email, password) => {
  debug("user.DAL -> userLogin");
  let userLoginQuery = common.cloneObject(query.userLoginQuery);
  userLoginQuery.filter.and[0].value = email;
  userLoginQuery.filter.and[1].value = password;
  return await common.executeQuery(userLoginQuery);
};

let expireAccessToken = async (deviceId, token) => {
  debug("user.DAL -> expireAccessToken");
  let editAccessTokenQuery = common.cloneObject(query.editAccessTokenQuery);
  editAccessTokenQuery.filter.and[0].value = deviceId;
  editAccessTokenQuery.filter.and[1].value = token;
  return await common.executeQuery(editAccessTokenQuery);
};

let addAccessToken = async (userId, deviceId, token, expiryDateTime) => {
  debug("user.DAL -> addAccessToken");
  let addAccessTokenQuery = common.cloneObject(query.addAccessTokenQuery);
  let dbExpiryDateTime = d3.timeFormat(dbDateFormat)(new Date(expiryDateTime));
  addAccessTokenQuery.insert.fValue = [userId, deviceId, token, dbExpiryDateTime];
  return await common.executeQuery(addAccessTokenQuery);
};

let addUser = async (username, email, usertype, password) => {
  debug("user.DAL -> addUser");
  let addUserQuery = common.cloneObject(query.addUserQuery);
  addUserQuery.insert.fValue = [username, email, usertype, password];
  return await common.executeQuery(addUserQuery);
};

let getUserList = async () => {
  debug("user.DAL -> getUserList");
  let getUserListQuery = common.cloneObject(query.getUserListQuery);
  return await common.executeQuery(getUserListQuery);
};

let getManagerList = async () => {
  debug("user.DAL -> getManagerList");
  let getManagerListQuery = common.cloneObject(query.getManagerListQuery);
  return await common.executeQuery(getManagerListQuery);
};


let getUser = async (id) => {
  debug("user.DAL -> getUser");
  let getUserQuery = common.cloneObject(query.getUserQuery);
  getUserQuery.filter.value = id;
  return await common.executeQuery(getUserQuery);
};

let updateUser = async (id, fieldValueUpdate) => {
  debug("user.DAL -> updateUser");
  let updateUserQuery = common.cloneObject(query.updateUserQuery);
  updateUserQuery.update = fieldValueUpdate
  updateUserQuery.filter.value = id;
  return await common.executeQuery(updateUserQuery);
};

let deleteUser = async (id) => {
  debug("user.DAL -> deleteUser");
  let deleteUserQuery = common.cloneObject(query.deleteUserQuery);
  deleteUserQuery.filter.value = id;
  return await common.executeQuery(deleteUserQuery);
};

module.exports = {
  checkUserExist: checkUserExist,
  userLogin: userLogin,
  expireAccessToken: expireAccessToken,
  addAccessToken: addAccessToken,
  addUser: addUser,
  getUserList: getUserList,
  getManagerList: getManagerList,
  getUser: getUser,
  updateUser: updateUser,
  deleteUser: deleteUser
};
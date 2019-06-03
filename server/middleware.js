var debug = require('debug')('server:middleware');
var d3 = require("d3");
var uuid = require('uuid');
var randomstring = require("randomstring");
var constant = require('./api/constant');
var queryExecutor = require('./helper/mySql');
var config = require('../config');
// let ipAdddress = require('../ipAddress');
// var Logger = require('./models/logger');
// let userService = require('./api/v1/user/user.service');
let DateLibrary = require('date-management');

let checkIsValidRequest = (request, response, next) => {
  debug("middleware -> checkIsValidRequest");
  let postmanToken = request.headers["postman-token"];
  let userAgent = request.headers["user-agent"];
  let masterKey = request.headers["master_key"];
  if (config.environment === "production" && masterKey !== '45632789202') {
    if (postmanToken !== undefined && config.environment === "production") {
      response.statusCode = 405;
      return response.send({
        status: false,
        error: constant.requestMessages.ERR_INVALID_API_REQUEST
      });
    } else if (userAgent.includes('axios/') === true ||
      userAgent.includes('PostmanRuntime/') === true ||
      userAgent.includes('loadtest/') === true) {
      response.statusCode = 405;
      return response.send({
        status: false,
        error: constant.requestMessages.ERR_INVALID_API_REQUEST
      });
    }
  }
  next();
};

let checkRequestHeader = function (request, response, next) {
  debug("middleware -> checkRequestHeader");
  let api_key = request.headers["api-key"];
  let udid = request.headers["udid"];
  let device_type = request.headers["device-type"];
  if (api_key === undefined) {
    return response.send({
      status: false,
      error: constant.requestMessages.ERR_API_KEY_NOT_FOUND
    });
  } else if (device_type === undefined) {
    return response.send({
      status: false,
      error: constant.requestMessages.ERR_DEVICE_TYPE_NOT_FOUND
    });
  } else if (constant.appConfig.APPLICATION_API_KEY.includes(api_key) !== true) {
    return response.send({
      status: false,
      error: constant.requestMessages.ERR_INVALID_API_KEY
    });
  } else if (udid === undefined) {
    return response.send({
      status: false,
      error: constant.requestMessages.ERR_UDID_NOT_FOUND
    });
  }
  next();
};

var checkAccessToken = function (request, response, next) {
  debug("middleware -> checkAccessToken");
  var accessToken = request.headers["authorization"];
  var udid = request.headers["udid"];
  if (accessToken === undefined && (request.method === "GET")) {
    if (request.session.userInfo === undefined) {
      request.session.userInfo = {
        accessToken: uuid.v1(),
        userId: -1,
        name: 'Guest' + randomstring.generate({
          "length": 4,
          "charset": 'numeric'
        }),
        mobile: '9XXXXXXXXX',
        countryCode: '+91',
        cityId: -1
      };
    }
    debug("Guest Session: ", request.session.userInfo);
    next();
    return;
  }
  if (accessToken === undefined) {
    response.statusCode = 401;
    return response.send({
      status: false,
      error: {
        code: 401,
        message: "Unauthorized access"
      }
    });
  } else {
    var jsonQuery = {
      table: "view_AccessToken",
      select: [{
        field: 'userId',
      }, {
        field: 'name',
      }, {
        field: 'mobile',
      }, {
        field: 'countryCode',
      }, {
        field: 'cityId',
      }],
      filter: {
        and: [{
          field: 'deviceId',
          operator: 'EQ',
          value: udid
        }, {
          field: 'token',
          operator: 'EQ',
          value: accessToken
        }]
      }
    };
    queryExecutor.executeQuery(jsonQuery, function (result) {
      if (result.status === false) {
        return response.send({
          status: false,
          error: {
            code: 9000,
            message: "Error in executeQuery"
          }
        });
      } else if (result.content.length === 0) {
        response.statusCode = 401;

        return response.send({
          status: false,
          error: {
            code: 401,
            message: "Unauthorized access"
          }
        });
      }
      debug("Session Old: ", request.session.userInfo);
      if (request.session.userInfo === undefined || request.session.userInfo.userId === -1) {
        request.session.userInfo = {
          accessToken: accessToken,
          userId: result.content[0].userId,
          name: result.content[0].name,
          countryCode: result.content[0].countryCode,
          mobile: result.content[0].mobile,
          cityId: result.content[0].cityId
        };
        debug("Session New: ", request.session.userInfo);
      }
      next();
    });
  }
};

let logger = function (request, response, next) {
  let fullUrl = request.protocol + '://' + request.get('host') + request.originalUrl;
  let userId = -1;
  if (request.session.userInfo !== undefined) {
    userId = request.session.userInfo.userId;
  }
  let type = request.method;
  let headers = JSON.stringify(request.headers);
  let body = JSON.parse(JSON.stringify(request.body));
  let params = JSON.stringify(request.params);
  let query = JSON.stringify(request.query);
  let ipAddress = ipAdddress.getClientIp(request);
  debug("requested ipAddress: ", ipAddress);
  debug("request HTTP method: ", type);
  debug("request headers: ", headers);
  debug("request body: ", body);
  debug("request params: ", params);
  debug("request query: ", query);
  debug("request URL: ", fullUrl);
  debug("requested userID: ", userId);
  if (config.isLogger === true) {
    if (config.logger_in === "mysql") {
      let jsonQuery = {
        table: "tbl_Logger",
        insert: {
          field: ["type", "URL", "headers", "body", "params", "query", "fk_userID", "ipAddress"],
          fValue: [type, fullUrl, headers, body, params, query, userId, ipAddress]
        }
      };

      queryExecutor.executeQuery(jsonQuery, function (result) {
        if (result.status === false) {
          return response.send({
            status: false,
            error: {
              code: 9000,
              message: "Error in executeQuery"
            }
          });
        }
      });
    } else if (config.logger_in === "mongodb") {
      let LoggerSchema = new Logger({
        type: type,
        URL: fullUrl,
        headers: headers,
        body: body,
        params: params,
        query: query,
        fk_userID: userId,
        ipAddress: ipAddress,
        createdDate: new Date()
      });
      LoggerSchema.save();
    }
  }
  next();
};

let checkAPIBlockForSpecifyTime = (request, response, next) => {
  debug("middleware -> checkAPIBlockForSpecifyTime");
  let startTime = "03:30:00", endTime = "09:30:00";
  let weekNameWhenBlock = ["Saturday", "Sunday"];
  let startDateTime = new Date();
  startDateTime.setHours(3);
  startDateTime.setMinutes(30);
  let endDateTime = new Date();
  endDateTime.setHours(9);
  endDateTime.setMinutes(30);
  let currentTimeStamp = (new Date()).getTime();
  let weekName = DateLibrary.getDayOfWeek(new Date(), {operationType: "Day_of_Week"});
  if (weekNameWhenBlock.includes(weekName) === true && startDateTime.getTime() < currentTimeStamp && endDateTime.getTime() > currentTimeStamp) {
    return response.send({
      status: false,
      error: constant.requestMessages.ERR_API_BLOCK_ON_SPECIFY_TIME
    });
  }
  next();
};


let appLogger = (request, response, next) => {
  debug("middleware -> appLogger");
  if (request.headers['udid'] !== undefined || (request.session.userInfo !== undefined && request.session.userInfo['udid'] !== undefined)) {
    let AppLog = require('./models/appLog');
    let appLog = new AppLog({
      deviceType: request.headers['device-type'] || "",
      deviceInfo: request.headers['device-info'] || "",
      appVersion: request.headers['app-version'] || "",
      appName: request.headers['app-name'] || "",
      udid: request.headers['udid'] || request.session.userInfo['udid'],
      userId: request.session.userInfo['userId'] || -1,
      isWhiteLabel: request.headers['is-white-label'] || 0,
      createdDate: new Date(),
    });
    appLog.save(error => {
    });
  }
  next();
};


module.exports = {
  checkIsValidRequest: checkIsValidRequest,
  checkRequestHeader: checkRequestHeader,
  checkAccessToken: checkAccessToken,
  checkAPIBlockForSpecifyTime: checkAPIBlockForSpecifyTime,
  logger: logger,
  appLogger: appLogger,
};
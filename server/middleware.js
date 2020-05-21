let debug = require('debug')('server:middleware');
let queryExecutor = require('./helper/mySql');


/*
*
* this function use for the validating access token
*
* */
let checkAccessToken = async (request, response, next) => {
  debug("middleware -> checkAccessToken");
  let deviceId = request.headers["udid"] || request.cookies.udid;
  let token = request.headers["token"] || request.cookies.token;
  if (request.session.userInfo === undefined) {
    let jsonQuery = {
      join: {
        table: "tbl_UserMaster",
        alias: 'UM',
        joinwith: [{
          table: "tbl_AccessToken",
          alias: 'AT',
          joincondition: {
            table: 'UM',
            field: 'pk_userID',
            operator: 'eq',
            value: {
              table: 'AT',
              field: 'fk_userID'
            }
          }
        }]
      },
      select: [{
        field: 'pk_userID',
        alias: 'userId'
      }, {
        field: 'name',
        alias: 'name'
      }, {
        field: 'userType',
        alias: 'userType'
      }],
      filter: {
        and: [{
          field: 'deviceId',
          operator: 'EQ',
          value: deviceId
        }, {
          field: 'token',
          operator: 'EQ',
          value: token
        }]
      }
    };
    let result = await queryExecutor.executeQuery(jsonQuery);
    if (result.status === false) {
      response.statusCode = 401;
      // return response.send({
      //   status: false,
      //   error: {
      //     code: 401,
      //     message: "Unauthorized access"
      //   }
      // });
      response.redirect('/');
    } else if (result.content.length === 0) {
      response.statusCode = 401;
      // return response.send({
      //   status: false,
      //   error: {
      //     code: 401,
      //     message: "Unauthorized access"
      //   }
      // });
      response.redirect('/');
    } else {
      if (request.session.userInfo === undefined) {
        request.session.userInfo = {
          accessToken: token,
          userId: result.content[0]['userId'],
          name: result.content[0]['name'],
          userType: result.content[0]['userType'],
        };
      }
      debug("Session: ", request.session.userInfo);
      next();
    }
  } else {

    next();
  }
};


module.exports = {
  checkAccessToken: checkAccessToken,
};
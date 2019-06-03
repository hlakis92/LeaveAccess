var debug = require('debug')('server:helper:mySql');
var connectionIdentifier = require('./../../core_modules/node-database-connectors');
var connection = require('./connection');
var config = require('../../config');


// function prepareQuery(queryJSON, cb) {
//   try {
//     var objConnection = connectionIdentifier.identify(config.dbConfig);
//     var query = objConnection.prepareQuery(queryJSON);
//     cb({
//       status: true,
//       content: query
//     });
//   } catch (ex) {
//     cb({
//       status: false,
//       error: ex
//     });
//   }
// }

//Async Prepare Query...!!!
function prepareQuery(queryJSON) {
  return new Promise(function (resolve, reject) {
    try {
      var objConnection = connectionIdentifier.identify(config.dbConfig);
      var query = objConnection.prepareQuery(queryJSON);
      resolve({
        status: true,
        content: query
      });
    } catch (ex) {
      reject({
        status: false,
        error: ex
      });
    }
  })
}

exports.prepareQuery = function (queryJSON) {
  try {
    var objConnection = connectionIdentifier.identify(config.dbConfig);
    var query = objConnection.prepareQuery(queryJSON);
    return query;
  } catch (ex) {
    return "";
  }
};

// exports.executeQuery = function(queryJSON, cb) {
//   prepareQuery(queryJSON, function(result) {
//     if (result.status === false) {
//       cb(result);
//     } else {
//       var rawQuery = result.content;
//       debug(rawQuery);
//       connection.executeRawQuery(rawQuery, cb);
//     }
//   });
// };

//Async Execute Query...!!!
exports.executeQuery = async function (queryJSON, cb) {
  try {
    var result = await prepareQuery(queryJSON)
    var rawQuery = result.content;
    debug("rawQuery", rawQuery)
    var queryResult = await connection.executeRawQuery(rawQuery);
    if (cb) {
      cb(queryResult);
    }
    else {
      return queryResult;
    }
  }
  catch (ex) {
    console.log(ex);
    if (cb) {
      if (ex.hasOwnProperty('status') === true && ex.hasOwnProperty('error') === true && ex.error.hasOwnProperty('code') === true && ex.error.hasOwnProperty('message') === true) {
        cb(ex);
      } else {
        cb({
          status: false,
          error: {
            code: 1000,
            message: 'Something went wrong.'
          }
        });
      }
    } else {
      throw ex;
    }
  }
};


// exports.executeRawQuery = function(rawQuery, cb) {
//   debug(rawQuery);
//   connection.executeRawQuery(rawQuery, cb);
// };

//Async Query
exports.executeRawQuery = async function (rawQuery, cb) {
  debug(rawQuery);
  try {
    var queryResult = await connection.executeRawQuery(rawQuery);
    if (cb) {
      cb(queryResult);
    }
    else {
      return queryResult;
    }
  } catch (ex) {
    debug(ex);
    console.log(ex);
    if (cb) {
      if (ex.hasOwnProperty('status') === true && ex.hasOwnProperty('error') === true && ex.error.hasOwnProperty('code') === true && ex.error.hasOwnProperty('message') === true) {
        cb(ex);
      } else {
        cb({
          status: false,
          error: {
            code: 1000,
            message: 'Something went wrong.'
          }
        });
      }
    } else {
      throw ex;
    }
  }

};

// function prepareMultipleQuery(queryArrayJSON, cb) {
//   var rawQueryArray = [];
//   prepareMultipleQueryRecursion(0);
//
//   function prepareMultipleQueryRecursion(index) {
//     if (queryArrayJSON.length > index) {
//       var queryJSON = queryArrayJSON[index];
//       prepareQuery(queryJSON, function(result) {
//         if (result.status === false) {
//           cb(result);
//           return;
//         } else {
//           var rawQuery = result.content;
//           debug(rawQuery);
//           rawQueryArray.push(rawQuery);
//           prepareMultipleQueryRecursion((index + 1));
//         }
//       });
//     } else {
//       cb({
//         status: true,
//         content: rawQueryArray
//       })
//     }
//   }
// }

//Async preparemultiple Query...!!!
function prepareMultipleQuery(queryArrayJSON) {

  return new Promise(function (resolve, reject) {
    try {
      var rawQueryArray = [];
      prepareMultipleQueryRecursion(0);

      async function prepareMultipleQueryRecursion(index) {
        if (queryArrayJSON.length > index) {
          var queryJSON = queryArrayJSON[index];
          var result = await prepareQuery(queryJSON);
          var rawQuery = result.content;
          debug(rawQuery);
          rawQueryArray.push(rawQuery);
          prepareMultipleQueryRecursion((index + 1));
        } else {
          resolve({
            status: true,
            content: rawQueryArray
          })
        }
      }
    } catch (ex) {
      reject({
        status: false,
        error: ex
      });
    }
  })
}

// exports.executeQueryWithTransactions = function(queryArrayJSON, cb) {
//   console.log('welcome')
//   prepareMultipleQuery(queryArrayJSON, function(result) {
//     if (result.status === false) {
//       cb(result);
//     } else {
//       var rawQueryArray = result.content;
//       connection.executeRawQueryWithTransactions(rawQueryArray, cb);
//     }
//   });
// };

exports.executeRawQueryWithTransactions = async function (rawQueryArray, cb) {
  debug(rawQueryArray);
  // connection.executeRawQueryWithTransactions(rawQueryArray, cb);
  try {
    let queryResult = await connection.executeRawQueryWithTransactions(rawQueryArray);
    if (cb) {
      cb(queryResult);
    }
    else {
      return queryResult;
    }
  } catch (ex) {
    cb({
      status: false,
      error: ex
    });
  }
};

exports.executeQueryWithTransactions = async function (queryArrayJSON, cb) {
  try {
    var result = await prepareMultipleQuery(queryArrayJSON);
    var rawQueryArray = result.content;
    var queryResult = await connection.executeRawQueryWithTransactions(rawQueryArray);
    if (cb) {
      cb(queryResult);
    }
    else {
      return queryResult;
    }
  }
  catch (ex) {
    cb({
      status: false,
      error: ex
    });
  }
};
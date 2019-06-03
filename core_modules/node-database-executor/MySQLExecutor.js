var debug = require('debug')('database-executor:database-executor');
var connectionIdentifier = require('./../node-database-connectors');
var constant = require('./constants.js');
var sql = require('mssql');

if(global._connectionPools == null){
  global._connectionPools={};
}

function prepareQuery(dbConfig, queryConfig, cb) {
  try {
    var objConnection = connectionIdentifier.identify(dbConfig);
    var query = objConnection.prepareQuery(queryConfig);
    cb({
      status: true,
      content:query
    });
  } catch (ex) {
    debug('exception: ', ex);
    var e = constant.error[1203];
    //e.exception=ex;
    cb({
      status: false,
      error: e
    });
  }
}

function executeRawQueryWithConnection(dbConfig, rawQuery, cb) {
  try {
    if(dbConfig.databaseType == "mssql")
    {
        var objConnection = connectionIdentifier.identify(dbConfig);
        objConnection.connect(dbConfig, function(config) {
            var connection = new sql.Connection(config, function(err) {
                var request = new sql.Request(connection);
                request.query(rawQuery, function(err, result) {
                    cb({
                      status: true,
                      content:result
                    });
                    connection.close();
                });
            });
        });
    }
    else
    {
    var objConnection = connectionIdentifier.identify(dbConfig);
    objConnection.connect(dbConfig, function(err, connection) {
      if (err != undefined) {
        debug('connection error: ', err);
        var e = constant.error[1201];
        //e.exception=ex;
        cb({
          status: false,
          error: e
        });
      } else {
        //debug('connection opened');
        connection.beginTransaction(function(err) {
          if (err) {
            debug("beginTransaction", err);
            cb({
              status: false,
              error: err
            });
          } else {
            if(rawQuery.length<=100000000){
              debug('query: %s', rawQuery);
            }
            else {
              debug('query: %s', rawQuery.substring(0,500)+"\n...\n"+rawQuery.substring(rawQuery.length-500, rawQuery.length));
            }
            connection.query(rawQuery, function(err, results) {
              if (err) {
                debug("query", err);
                connection.rollback(function() {
                  var e = constant.error[1202];
                  //e.exception = err;
                  cb({
                    status: false,
                    error: e
                  });
                  connection.end();
                });
              } else {
                connection.commit(function(err) {
                  if (err) {
                    debug("commit", err);
                    connection.rollback(function() {
                      var e = constant.error[1202];
                      //e.exception = err;
                      cb({
                        status: false,
                        error: e
                      });
                      connection.end();
                    });
                  } else {
                    //debug('connection closed');
                    cb({
                      status: true,
                      content:results
                    });
                    connection.end();
                  }
                });
              }
            });
          }
        });
      }
    });}
  } catch (ex) {
    debug('exception: ', ex);
    var e = constant.error[1203];
    //e.exception=ex;
    cb({
      status: false,
      error: e
    });
  }
}

//VRP : Deleted "exports.prepareQuery" method as we dont want to expose this method from this module

exports.executeRawQuery = function(requestData, connection, cb) {
  // debug('dbcon req:\nrequestData: %s\nconnection: %s ', JSON.stringify(requestData), JSON.stringify(connection));
  var dbConfig = requestData.dbConfig;
  var rawQuery = requestData.query;
  executeRawQuery(dbConfig, rawQuery, cb);
}

exports.executeQuery = function(requestData, connection, cb) {
  //debug('dbcon req:\nrequestData: %s\nconnection: %s ', JSON.stringify(requestData), JSON.stringify(connection));
  var dbConfig = requestData.dbConfig;
  var queryConfig = requestData.query;
  prepareQuery(dbConfig, queryConfig, function(data) {
    if (data.status == true) {
      executeRawQuery(dbConfig, data.content, cb);
    } else {
      cb(data);
    }
  });
}

exports.executeQueryStream = function(requestData, onResultFunction, cb) {
  var dbConfig = requestData.dbConfig;
  var query = requestData.rawQuery;
  console.log(JSON.stringify(dbConfig));
  var objConnection = connectionIdentifier.identify(dbConfig);
  objConnection.connect(dbConfig, function(err, connection) {
    if (err != undefined) {
      debug('connection error: ', err);
      var e = constant.error[1201];
      //e.exception=ex;
      cb({
        status: false,
        error: e
      });
    } else {
      var queryExecutor = connection.query(query);
      queryExecutor
              .on('error', function (err) {
                  cb({
                    status:false,
                    error:err
                  });
                  // Handle error, an 'end' event will be emitted after this as well
              })
              .on('fields', function (fields) {
                  // the field packets for the rows to follow
              })
              .on('result', function (row) {
                  // Pausing the connnection is useful if your processing involves I/O
                  connection.pause();

                  onResultFunction(row, function () {
                      connection.resume();
                  });
              })
              .on('end', function () {
                cb({
                  status:true
                });

              });
    }
  });
}


// DS : Handle Multiple Queries with same connection similar to batch queries;

function executeRawQueryWithConnectionPool(dbConfig, rawQuery, cb) {
  try {
    var startTime=new Date();
    getConnectionFromPool(dbConfig, function(result){
      if (result.status === false) {
        //debug('connection error: ', err);
        var e = constant.error[1201];
        //e.exception=ex;
        cb({
          status: false,
          error: e
        });
      } else {
        var connection = result.content;
        if(rawQuery.length<=100000000){
        //  debug('query: %s', rawQuery);
        }
        else {
        //  debug('query: %s', rawQuery.substring(0,500)+"\n...\n"+rawQuery.substring(rawQuery.length-500, rawQuery.length));
        }
        var queryStartTime=new Date();
        connection.query(rawQuery, function(err, results) {
          if (err) {
          //  debug("query", err);
            var e = constant.error[1202];
            cb({
              status: false,
              error: e
            });
          } else {
            console.log("Total Time:", (new Date().getTime() - startTime.getTime())/1000, "Query Time:", (new Date().getTime() - queryStartTime.getTime())/1000);
            //console.log("Query:", rawQuery);
            // console.log('results Data',JSON.stringify(results));
            try {
              cb({
                status: true,
                content: results
              });
            }
            catch (ex){
              console.log('catch bloack',ex);
              if(!ex) {
                cb({
                  status: true,
                  content: results
                });
              }
            }
          }
        });
      }
    });
  } catch (ex) {
    debug('exception: ', ex);
    var e = constant.error[1203];
    //e.exception=ex;
    cb({
      status: false,
      error: e
    });
  }
}


function executeRawQuery(dbConfig, rawQuery, cb){
  if(dbConfig.hasOwnProperty('connectionLimit') && dbConfig.connectionLimit == 0){
    console.log("With New Connection");
    executeRawQueryWithConnection(dbConfig, rawQuery, cb);
  }
  else {
    console.log("With Connection Pool");
    executeRawQueryWithConnectionPool(dbConfig, rawQuery, cb);
  }
}


function getConnectionFromPool(dbConfig, cb){
  try {
    var connectionString = (dbConfig.databaseType+'://'+dbConfig.user+':'+dbConfig.password+'@'+dbConfig.host+':'+dbConfig.port+'/'+dbConfig.database);
    if(global._connectionPools.hasOwnProperty(connectionString)){
      cb({
        status: true,
        content: global._connectionPools[connectionString]
      });
      return;
    }
    else {
      var objConnection = connectionIdentifier.identify(dbConfig);
      objConnection.connectPool(dbConfig, function(err, pool) {
        if (err != undefined) {
          debug('connection error: ', err);
          var e = constant.error[1201];
          //e.exception=ex;
          cb({
            status: false,
            error: e
          });
        } else {
          global._connectionPools[connectionString]=pool;
          cb({
            status: true,
            content: pool
          });
        }
      });
    }
  } catch (ex) {
    console.log('exception: ', ex);
    var e = constant.error[1203];
    //e.exception=ex;
    cb({
      status: false,
      error: e
    });
  }
}

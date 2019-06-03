let debug = require('debug')('server:api:v1:common');
let d3 = require("d3");
let url = require('url');
let querystring = require('querystring');
let constant = require('./constant');
let s3Config = constant.appConfig.S3_CONFIG;
let queryExecutor = require('../helper/mySql');
let dbDateFormat = constant.appConfig.DB_DATE_FORMAT;
let pageSize = constant.appConfig.PAGE_SIZE;
let config = require('../../config');
// let sendSMSObj = require('../../helper/sendsms');
// let FB = require('fb');
// let path = require('path');
// let mongoDBConnection = ('../../helper/mongoDB');
// let neo4J = require('../../helper/neo4J');
// var fs = require('graceful-fs');
// var parseString = require('xml2js').parseString,
//   xml2js = require('xml2js');


module.exports.cloneObject = function (obejct) {
  return JSON.parse(JSON.stringify(obejct));
};

module.exports.trimString = function (string) {
  return string.replace(/  +/g, ' ');
};
module.exports.sort_by = function () {
  var fields = [].slice.call(arguments),
    n_fields = fields.length;

  return function (A, B) {
    var a, b, field, key, primer, reverse, result;
    for (var i = 0, l = n_fields; i < l; i++) {
      result = 0;
      field = fields[i];

      key = typeof field === 'string' ? field : field.name;

      a = A[key];
      b = B[key];

      if (typeof field.primer !== 'undefined' && field.primer !== "date") {
        a = field.primer(a);
        b = field.primer(b);
      }
      if (typeof field.primer !== 'undefined' && field.primer == "date") {
        a = new Date(a);
        b = new Date(b);
      }


      reverse = (field.reverse) ? -1 : 1;

      if (a < b) result = reverse * -1;
      if (a > b) result = reverse * 1;
      if (result !== 0) break;
    }
    return result;
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports.sendBrandMessage = function (type, countryCode, mobile, data) {
  var brandDetail = constant.matchBrandMessage.filter(function (d) {
    return d.type == type
  });
  var brandnumber = getRandomInt(1, brandDetail.length);
  config.smsConfig.messageTemplate[7] = brandDetail[brandnumber - 1].message;
  let sendSMSObj = require('../../helper/sendsms');
  sendSMSObj.sendSMS(countryCode, mobile, 7, data, undefined, false, function (resultSMSUser) {
  });
  return true;
};

// module.exports.executeQuery = function (jsonQuery, cb) {
//   queryExecutor.executeQuery(jsonQuery, function (result) {
//     if (result.status === false && result.error.code === 10002) {
//       cb({
//         status: false,
//         error: {
//           code: 9001,
//           message: "Error duplicate entry"
//         }
//       });
//       return;
//     }
//     if (result.status === false) {
//       cb({
//         status: false,
//         error: {
//           code: 9000,
//           message: "Error in executeQuery"
//         }
//       });
//       return;
//     }
//     cb(result);
//   });
// };

// //Async Execute Query...!!!
module.exports.executeQuery = async function (jsonQuery, cb) {
  if (cb) {
    await queryExecutor.executeQuery(jsonQuery, cb);
  } else {
    return await queryExecutor.executeQuery(jsonQuery);
  }
};

// module.exports.executeRawQuery = function (jsonQuery, cb) {
//   queryExecutor.executeRawQuery(jsonQuery, function (result) {
//     if (result.status === false && result.error.code === 10002) {
//       cb({
//         status: false,
//         error: {
//           code: 9001,
//           message: "Error duplicate entry"
//         }
//       });
//       return;
//     }
//     if (result.status === false) {
//       cb({
//         status: false,
//         error: {
//           code: 9000,
//           message: "Error in executeQuery"
//         }
//       });
//       return;
//     }
//     cb(result);
//   });
// };

module.exports.executeRawQuery = async function (jsonQuery, cb) {
  if (cb) {
    await queryExecutor.executeRawQuery(jsonQuery, cb);
  } else {
    return await queryExecutor.executeRawQuery(jsonQuery);
  }
};


// module.exports.executeQueryWithTransactions = function (queryArrayJSON, cb) {
//   queryExecutor.executeQueryWithTransactions(queryArrayJSON, function (result) {
//     if (result.status === false) {
//       cb({
//         status: false,
//         error: {
//           code: 9000,
//           message: "Error in executeQuery"
//         }
//       });
//       return;
//     }
//     cb(result);
//   });
// };

module.exports.executeQueryWithTransactions = async function (jsonQueryJSONArray, cb) {
  if (cb) {
    await queryExecutor.executeQueryWithTransactions(jsonQueryJSONArray, cb);
  } else {
    return await queryExecutor.executeQueryWithTransactions(jsonQueryJSONArray);
  }
};

module.exports.executeRawQueryWithTransactions = async function (rawQueryJSONArray, cb) {
  if (cb) {
    await queryExecutor.executeRawQueryWithTransactions(rawQueryJSONArray, cb);
  } else {
    return await queryExecutor.executeRawQueryWithTransactions(rawQueryJSONArray);
  }
};

module.exports.prepareQuery = function (queryJSON) {
  return queryExecutor.prepareQuery(queryJSON);
};

module.exports.getPaginationObject = function (request) {
  let paginationObj = {};
  let serverDateTime;
  let pageNo;
  if (request.query.pageno === undefined || request.query.datetime === undefined) {
    pageNo = 1;
    serverDateTime = (new Date()).getTime();
  } else {
    pageNo = parseInt(request.query.pageno);
    serverDateTime = parseInt(request.query.datetime);
  }
  let localPageSize = pageSize;
  if (request.query.pagesize !== undefined) {
    localPageSize = parseInt(request.query.pagesize);
  }
  paginationObj.pageNo = pageNo;
  paginationObj.serverDateTime = serverDateTime;
  paginationObj.dbServerDateTime = d3.timeFormat(dbDateFormat)(new Date(serverDateTime));
  paginationObj.limit = [localPageSize * (pageNo - 1), localPageSize];
  return paginationObj;
};

module.exports.paginationListing = function (request, result, pageNo, serverDateTime, errorMsg, cb) {
  debug("common -> paginationListing");
  if (cb === undefined) {
    if (result.status === false) {
      return (result);
    } else if (result.content.length == 0 && pageNo == 1) {
      return ({
        status: false,
        error: errorMsg
      });
    } else {
      return ({
        status: true,
        page: pagination(request, result.content.length, pageNo, serverDateTime),
        data: result.content
      });
    }
  } else {
    if (result.status === false) {
      cb(result);
    } else if (result.content.length == 0 && pageNo == 1) {
      cb({
        status: false,
        error: errorMsg
      });
    } else {
      cb({
        status: true,
        page: pagination(request, result.content.length, pageNo, serverDateTime),
        data: result.content
      });
    }
  }
};

module.exports.pagination = function (request, contentLength, pageNo, serverDateTime) {
  debug("common -> pagination");
  return pagination(request, contentLength, pageNo, serverDateTime);
};

function pagination(request, contentLength, pageNo, serverDateTime) {
  debug("common -> pagination()");
  var pageOptions = {};
  var pathName = (request.originalUrl).replace(constant.appConfig.API_START_PATH, '');
  pathName = (pathName).replace(constant.appConfig.API_VERSION, '').replace('?/other/get-metadata', '');
  var localPageSize = constant.appConfig.PAGE_SIZE;

  var URI = url.parse(pathName);
  var queryObj = querystring.parse(URI.query)

  pathName = URI.pathname + '?';

  if (queryObj.pagesize != undefined) {
    localPageSize = queryObj.pagesize;
  }

  if (pageNo === 1 && contentLength < localPageSize) {
    return pageOptions;
  }

  if (contentLength < localPageSize || pageNo != 1) {
    queryObj.pageno = pageNo - 1;
    queryObj.datetime = serverDateTime;
    var newQueryString = querystring.stringify(queryObj)
    pageOptions.previous = pathName + newQueryString;
  }
  if (pageNo == 1 || contentLength == localPageSize || contentLength > localPageSize) {
    queryObj.pageno = pageNo + 1;
    queryObj.datetime = serverDateTime;
    var newQueryString = querystring.stringify(queryObj)
    pageOptions.next = pathName + newQueryString;
  }
  return pageOptions;
}

module.exports.getGetMediaURL = function (request) {
  debug("common -> getGetMediaURLExternal");
  return getGetMediaURL(request);
};
module.exports.getGeneralMediaURL = function (request) {
  debug("common -> getGeneralMediaURL");
  return getGeneralMediaURL(request);
};

function getGetMediaURL(request) {
  debug("common -> getGetMediaURL");
  let fullUrl = constant.appConfig.MEDIA_GET_STATIC_URL;
  if (constant.appConfig.MEDIA_UPLOAD_SERVICE === 'local') {
    fullUrl = request.protocol + '://' + request.get('host') + constant.appConfig.MEDIA_GET_STATIC_URL;
    // fullUrl = "http://192.168.0.47:3000/api/v1/media/get-media"; // ashish
  } else {
    fullUrl = fullUrl.replace('{{region}}', s3Config.REGION);
  }
  return fullUrl;
}

function getGeneralMediaURL(request) {
  debug("common -> getGeneralMediaURL");
  var fullUrl = request.protocol + '://' + request.get('host') + constant.appConfig.MEDIA_GET_PUSH_URL;
  return fullUrl;
}

function getS3MediaURL(directoryName, fileName, s3config) {
  debug("common -> getS3MediaURL");
  var fullUrl = `https://${s3config.MEDIA_DEFAULT_BUCKET_NAME}.s3.${s3config.REGION}.amazonaws.com/${directoryName + fileName}`;
  return fullUrl;
};

module.exports.generatingTemplate = function (template, data, dataWrapperStartSign, dataWrapperEndSign) {
  debug("common -> generatingTemplate");
  var returnTemplate = template;
  var dataStartSign = dataWrapperStartSign || '{{';
  var dataEndSign = dataWrapperEndSign || '}}';

  while (true) {
    if (returnTemplate.length > 0) {
      var str = returnTemplate;
      var n1 = str.indexOf(dataStartSign);
      var n2 = str.indexOf(dataEndSign);
      if (n1 == -1 || n2 == -1 || n1 >= n2) {
        break;
      } else {
        var variable = str.substr(n1, n2 - n1 + 2);
        var key = (str.substr(n1 + 2, n2 - n1 - 2)).trim();

        if (data.hasOwnProperty(key)) {
          var value = data[key];
          returnTemplate = returnTemplate.replace(variable, value);
        } else {
          debug(key);
          debug("invalid key : " + variable);
          break;
        }
      }
    } else {
      break;
    }
  }
  return returnTemplate;
};

module.exports.JSON2ARRAY = function (objArray) {
  debug("common -> JSON2ARRAY");
  var array = typeof objArray != 'object' ? [objArray] : objArray;
  //console.log(typeof objArray);
  var arrData = [];
  var str = '';
  if (array.length > 0) {
    var keys = Object.keys(array[0]);
    arrData.push(keys)

    //append data
    for (var i = 0; i < array.length; i++) {
      var line = [];

      for (var index = 0; index < keys.length; index++) {
        if (array[i].hasOwnProperty(keys[index])) {
          var val = array[i][keys[index]];
          line.push(val);
        } else {
          line.push(null);
        }
      }
      arrData.push(line);
    }
  }
  return arrData;
};

module.exports.JSON2CSV = (objArray, requireHeader) => {
  var array = typeof objArray != 'object' ? [objArray] : objArray;
  //console.log(typeof objArray);
  var str = '';
  if (array.length > 0) {

    var keys = Object.keys(array[0]);
    if (requireHeader == true) {
      str += keys.join(',') + '\r\n';
    }

    //append data
    for (var i = 0; i < array.length; i++) {
      var line = [];

      for (var index = 0; index < keys.length; index++) {
        if (array[i].hasOwnProperty(keys[index])) {
          var val = array[i][keys[index]];

          if (typeof val == 'string' && val != null) {
            if (val.indexOf(',') != -1) {
              if (val != 'null')
                line.push('"' + val + '"');
              else
                line.push('');
            } else {
              if (val != 'null')
                line.push(val);
              else
                line.push('');
            }
          } else {
            line.push(val);
          }

        }
      }
      str += line.join(',') + '\r\n';
    }
    return str;
  }
};

module.exports.getTeamLogo = function (teamName) {
  debug("common -> getTeamLogoExternal");
  return getTeamLogo(teamName);
};

function getTeamLogo(teamA_name) {
  debug("common -> getTeamLogo");
  let teamAImage;
  let totalWordsA = teamA_name.replace(/[!@#$%^&*'./-]/g, "").split(" ");

  if (totalWordsA.length >= 2) {
    teamAImage = (totalWordsA[0].charAt(0) + totalWordsA[1].charAt(0)).toUpperCase();
  } else {
    teamAImage = (totalWordsA[0].charAt(0) + totalWordsA[0].charAt(1)).toUpperCase();
  }
  if (/\d/.test(teamAImage.charAt(0)) || /\d/.test(teamAImage.charAt(1))) {
    teamAImage = (teamAImage[0].charAt(0)).toUpperCase();
  }
  if (teamAImage.indexOf("("))
    return teamAImage.replace("(", "");
  return teamAImage;
}


module.exports.nestingData = function (data, nestKey) {
  debug("common -> nestingData");
  try {
    return d3.nest()
      .key(function (data) {
        return data[nestKey];
      })
      .entries(data);
  } catch (e) {
    debug("error at -> nestingData");
    return [];
  }
};

module.exports.nestingWithThreeKeyData = function (data, nestKey1, nestKey2, nestKey3) {
  debug("common -> nestingWithThreeKeyData");
  try {
    return d3.nest()
      .key(function (data) {
        return data[nestKey1] + "-" + data[nestKey2] + "-" + data[nestKey3];
      })
      .entries(data);
  } catch (e) {
    debug("error at -> nestingWithThreeKeyData");
    return [];
  }
};

module.exports.nestingDataWithCount = function (data, nestKey) {
  debug("common -> nestingDataWithCount");
  try {
    return d3.nest()
      .key(function (data) {
        return data[nestKey];
      })
      .rollup(function (leaves) {
        return leaves.length;
      })
      .entries(data);
  } catch (e) {
    debug("error at -> nestingDataWithCount");
    return [];
  }
};

module.exports.adjustValueOfKeyValuesPairToObject = function (nestData, valueFieldName) {
  debug("common -> adjustValueOfKeyValuesPairToObject");
  valueFieldName = valueFieldName || "values";
  try {
    let object = {};
    nestData.forEach(data => {
      object[data.key] = data[valueFieldName];
    });
    return object;
  } catch (e) {
    debug("error at -> adjustValueOfKeyValuesPairToObject");
    return {};
  }
};

module.exports.calculateCummalative = function (data, key) {
  debug("common -> calculateCummalative");
  try {
    let array = [];
    data.reduce(function (a, b, i) {
      b['c' + key] = a + b[key];
      array.push(b);
      return b['c' + key];
    }, 0);
    return array;
  } catch (e) {
    debug("error at -> calculateCummalative");
    return [];
  }
};

module.exports.removeDuplicateValueInArray = data => {
  debug("common -> removeDuplicateValueInArray");
  return data.reduce((x, y) => x.includes(y) ? x : [...x, y], []);
};


module.exports.validateObject = function (arrParam) {
  arrParam.forEach(function (param) {
    if (param == undefined && typeof param != "object") {
      return false;
    }
  });
  return true;
};

module.exports.validateParams = function (arrParam) {
  try {
    arrParam.forEach(function (param) {
      debug("param", param)
      if (param == undefined || param.toString().trim() == "") {
        throw "Invalid params";
      }
    });
    return true;
  } catch (ex) {
    return false;
  }
}

module.exports.sendResponse = function (response, obj, isSuccess) {
  if (isSuccess != undefined) {
    if (isSuccess == true) {
      response.send({
        status: true,
        data: obj
      });
    } else {
      response.send({
        status: false,
        error: obj
      });
    }
  } else {
    response.send(obj);
  }
}

module.exports.prepareObjData = function (keys, data) {
  let obj = {};
  if (keys.constructor.name == "Array" && keys.length > 0 && Object.keys(data).length !== 0) {
    let objKeys = Object.keys(data);
    objKeys.forEach(function (key) {
      if (data[key] !== undefined && keys.indexOf(key) > -1) {
        obj[key] = data[key];
      }
    });
  }
  return obj;
};


module.exports.generateRank = (list, keyName, isSkipRank) => {
  let rank = 1;
  let skipRank = 0;
  list.forEach((data, index) => {
    if (index !== 0 && list[index - 1].hasOwnProperty(keyName) === true && data.hasOwnProperty(keyName) === true) {
      if (list[index - 1][keyName] == data[keyName]) {
        data['rank'] = rank;
        skipRank++;
      } else {
        rank += 1;
        if (isSkipRank === true) {
          rank += skipRank;
        }
        skipRank = 0;
        data['rank'] = rank;
      }
    } else if (index === 0 && data.hasOwnProperty(keyName) === true) {
      data['rank'] = rank;
    }
  });
  return list;
};

module.exports.ordinal_suffix_of = function (i) {
  var j = i % 10,
    k = i % 100;
  if (j == 1 && k != 11) {
    return i + "st";
  }
  if (j == 2 && k != 12) {
    return i + "nd";
  }
  if (j == 3 && k != 13) {
    return i + "rd";
  }
  return i + "th";
};

module.exports.addLeadingZeros = (n, length) => {
  var str = (n > 0 ? n : -n) + "";
  var zeros = "";
  for (var i = length - str.length; i > 0; i--)
    zeros += "0";
  zeros += str;
  return n >= 0 ? zeros : "-" + zeros;
};

module.exports.stringValidator = (string) => {
  let pattern = new RegExp(/^[-\w_&.!@#$%^&*,+=?|\/\s)(\[\]\{\}\<\>\`]+$/);
  if (pattern.test(string)) {
    return true;
  } else {
    return false;
  }
};

module.exports.prepareTitleValueObj = (data, ignoreKey) => {
  let objKeys = Object.keys(data);
  let preparedData = [];
  objKeys.forEach(function (key) {
    if (ignoreKey.indexOf(key) === -1) {
      let battingObj = {};
      battingObj['title'] = key;
      battingObj['value'] = data[key];
      preparedData.push(battingObj)
    }
  });
  return preparedData;
};

module.exports.camelCase = function (str) {
  if (str != "") {
    str = str.toLowerCase();
    str = str.replace(/^\w/, c => c.toUpperCase())
  }
  return str;
}
module.exports.getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
module.exports.trimToLength = function (text, l) {
  debug("common -> trimToLength" + [text, l]);
  let textData = text;
  debug('Common===' + textData);
  return textData.length > l ? textData.substring(0, l - 3) + '...' : textData;
};

module.exports.differenceArray = function (arr, arr1) {
  debug("common -> differenceArray" + [arr, arr1]);
  let a1 = arr;
  let a2 = arr1.toString().split(',');
  return a2.filter(function (i) {
    return a1.indexOf(i) < 0;
  });
}

module.exports.getUnique = function (array, key) {

  const unique = array
    .map(e => e[key])

    // store the keys of the unique objects
    .map((e, i, final) => final.indexOf(e) === i && i)

    // eliminate the dead keys & store unique objects
    .filter(e => array[e]).map(e => array[e]);

  return unique;
};

module.exports.randomFixedInteger = function (length) {
  return Math.floor(Math.pow(10, length - 1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1));
}

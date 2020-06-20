let debug = require('debug')('server:api:media:DAL');
let common = require('../common');
let constant = require('../constant');
let query = require('./media.query');
let dbDateFormat = constant.appConfig.DB_DATE_FORMAT;

let addPaperWorkReviewDocument = async (addValueArray) => {
  debug("media.DAL -> addPaperWorkReviewDocument");
  let addPaperWorkReviewDocumentQuery = common.cloneObject(query.addPaperWorkReviewDocumentQuery);
  addPaperWorkReviewDocumentQuery.insert.fValue = addValueArray;
  return await common.executeQuery(addPaperWorkReviewDocumentQuery);
};

module.exports = {
  addPaperWorkReviewDocument: addPaperWorkReviewDocument
};
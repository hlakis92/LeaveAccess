let debug = require('debug')('server:api:leave:service');
let AWS = require('aws-sdk');
let fileExtension = require('file-extension');
let randomString = require("randomstring");
let fs = require('fs');
let constant = require('./../constant');
let mediaDAL = require('./media.DAL');
let s3Config = constant.appConfig.S3_CONFIG;
AWS.config.update({
  region: s3Config.REGION,
  credentials: {
    accessKeyId: s3Config.ACCESS_KEY_ID,
    secretAccessKey: s3Config.SECRET_ACCESS_KEY
  },
  apiVersion: s3Config.API_VERSION
});
let s3 = new AWS.S3();


/**
 * Created By: AV
 * Updated By: AV
 *
 * upload media service for file upload
 *
 * @param  {object}   request
 * @param  {Function} cb
 * @return {object}
 */
let uploadMediaService = (request, cb) => {
  debug("media.service -> uploadMediaService");
  if (request.body.file === undefined || request.body.leave_info_id === undefined) {
    return cb({status: false, error: {}})
  }
  let fileObj = request.body.file;
  let leaveInfoId = request.body.leave_info_id;
  let file = fs.readFileSync(fileObj.path);
  let fileExt = fileExtension(fileObj.name);
  let newFileName = (new Date().getTime()) + "_" + randomString.generate(constant.appConfig.MEDIA_UPLOAD_FILE_NAME_SETTINGS) + '.' + fileExt;
  let addValueArray = [leaveInfoId, newFileName];
  let params = {Bucket: s3Config.MEDIA_DEFAULT_BUCKET_NAME, Key: newFileName, Body: file, ACL: 'public-read'};
  s3.upload(params, async (s3Err, data) => {
    console.log(s3Err, data);
    console.log(`File uploaded successfully at ${data.Location}`);
    fs.unlinkSync(fileObj.path);
    await mediaDAL.addPaperWorkReviewDocument(addValueArray);
    let leaveDAL = require('./../leave/leave.DAL');
    let cdata = {
      file_name: fileObj.name
    };
    let addLeaveChronology = leaveDAL.addLeaveChronology('', 3, leaveInfoId, JSON.stringify(cdata), request.session.userInfo.userId)
    return cb({
      status: true, data: {
        text: newFileName,
        url: constant.appConfig.MEDIA_GET_STATIC_URL + newFileName
      }
    });
  })
};

module.exports = {
  uploadMediaService: uploadMediaService,
};



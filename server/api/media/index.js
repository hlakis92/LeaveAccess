let debug = require('debug')('server:api:media:index');
let express = require('express');
let formidable = require('express-formidable');
let fs = require('fs');
let mkdirp = require('mkdirp');
let controller = require('./media.controller');
let constant = require('./../constant')

let router = express.Router();
module.exports = router;

// generating root media folder
generateRootMediaDir();

// this is for media upload
router.use(formidable.parse({
  keepExtensions: true,
  uploadDir: constant.appConfig.MEDIA_UPLOAD_DIR
}));
// router.use(formidableMiddleware());


router.post('/upload', controller.uploadMedia);

function generateRootMediaDir() {
  let rootMediaDir = constant.appConfig.MEDIA_UPLOAD_DIR;
  if (!fs.existsSync(rootMediaDir)) {
    mkdirp(rootMediaDir, err => {
      if (err) {
        console.log("error in media upload temporary folder ");
        console.log("kindly check constant.js following variable 'MEDIA_UPLOAD_DIR'");
        console.log("folder path: ", rootMediaDir);
        console.log("folder error: ", err);
      } else {
        console.log("media upload temporary folder is created!");
      }
    });
  }
}
let debug = require('debug')('server:api:leave:controller');
let mediaService = require('./media.service');
let constant = require('../constant');

/**
 * Created By: AV
 * Updated By: AV
 *
 *
 * @param  {object} request
 * @param  {object} response
 * @return {object}
 */
let uploadMedia = (request, response) => {
  debug("media.controller -> uploadMedia");
  mediaService.uploadMediaService(request, result => {
    return response.send(result);
  });
};


module.exports = {
  uploadMedia: uploadMedia,
};

let express = require('express');
let controller = require('./user.controller');
let middleware = require('../../middleware');

let router = express.Router();
module.exports = router;

router.post('/user-signup', controller.signup);
router.post('/user-signin', controller.signin);
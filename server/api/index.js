let express = require('express');
let middleware = require('../middleware');
let router = express.Router();
module.exports = router;


router.use('/user',  require('./user'));
router.use('/employee', middleware.checkAccessToken, require('./employee'));
router.use('/leave', middleware.checkAccessToken,  require('./leave'));
router.use('/task', middleware.checkAccessToken, require('./task'));
router.use('/media', require('./media'));
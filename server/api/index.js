let express = require('express');
let middleware = require('../middleware');
let router = express.Router();
module.exports = router;
// console.log("666666666666666666666")

router.use('/user',  require('./user'));
router.use('/employee',  require('./employee'));
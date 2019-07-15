let express = require('express');
let controller = require('./employee.controller');
let middleware = require('../../middleware');

let router = express.Router();
module.exports = router;

router.post('/add-employee', controller.addEmployee);
router.post('/dummy-call', controller.dummyCall);



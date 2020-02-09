let express = require('express');
let controller = require('./task.controller');
let middleware = require('../../middleware');

let router = express.Router();
module.exports = router;



router.get('/tasks', controller.tasks);
// router.post('/deletetask', controller.deletetask);
router.post('/addtask', controller.addtask);
// router.post('/updatetask', controller.updatetask);

router.get('/notes', controller.notes);
// router.post('/deletetask', controller.deletetask);
router.post('/addnotes', controller.addnotes);
router.post('/editnotes', controller.editnotes);
// router.post('/updatetask', controller.updatetask);
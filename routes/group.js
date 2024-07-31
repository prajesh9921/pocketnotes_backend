const express = require('express');
const router = express.Router();
const GroupController = require('../controller/groupController');

router.post('/addgroup', GroupController.ToAddGroup);
router.post('/addnotetogroup', GroupController.ToAddNoteToGroup);
router.get('/getallgroupsdata', GroupController.GetAllData);
router.get('/getsinglegroupdata/:groupId', GroupController.GetSingleGroupData);

module.exports = router;
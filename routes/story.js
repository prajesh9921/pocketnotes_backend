const express = require('express');
const router = express.Router();
const {AddStory, GetPostDataByQuery} = require('../controller/storyController');

router.post('/add', AddStory);

router.get('/stories', GetPostDataByQuery);

module.exports = router;
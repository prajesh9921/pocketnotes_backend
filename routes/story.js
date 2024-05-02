const express = require('express');
const router = express.Router();
const StoryController = require('../controller/storyController');
const Verify = require('../middleware/verifyToken');
const { verify } = require('jsonwebtoken');

router.post('/add', verify, StoryController.AddStory);

router.get('/stories', StoryController.GetPostDataByQuery);

router.get('/bmstories/:userid', StoryController.GetBookedMarkedStories);

router.put('/save/:storyid/:userid', StoryController.ToBookmarkStory);

router.put('/storylike/:storyid/:userid', StoryController.ToLikeStory);

router.get('/story/:storyid', StoryController.GetStoryById);

router.get('/yourstory/:userid', StoryController.GetyourStories);

router.put('/editstory/:storyid', StoryController.EditStory);

module.exports = router;
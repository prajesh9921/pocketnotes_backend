const express = require('express');
const router = express.Router();
const StoryController = require('../controller/storyController');

router.post('/add', StoryController.AddStory);

router.get('/stories', StoryController.GetPostDataByQuery);

router.get('/bmstories/:userid', StoryController.GetBookedMarkedStories);

router.put('/save/:storyid', StoryController.ToBookmarkStory);

router.put('/storylike/:storyid', StoryController.ToLikeStory);

router.get('/story/:storyid', StoryController.GetStoryById);

router.get('/yourstory/:userid', StoryController.GetyourStories);

module.exports = router;
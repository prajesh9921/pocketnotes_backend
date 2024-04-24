const express = require('express');
const router = express.Router();
// const {AddStory, GetPostDataByQuery, GetBookedMarkedStories, ToBookmarkStory, ToLikeStory, GetStoryById } = require('../controller/storyController');
const StoryController = require('../controller/storyController');

router.post('/add', StoryController.AddStory);

router.get('/stories', StoryController.GetPostDataByQuery);

router.get('/bmstories', StoryController.GetBookedMarkedStories);

router.put('/save/:storyid', StoryController.ToBookmarkStory)

router.put('/storylike/:storyid', StoryController.ToLikeStory);

router.get('/story/:storyid', StoryController.GetStoryById)

module.exports = router;
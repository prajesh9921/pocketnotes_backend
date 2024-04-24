const Story = require("../models/story");

// Add Story
const AddStory = async (req, res, next) => {
  try {
    const { category, data } = req.body;
    const userID = req.cookies.userid;

    if (!category || !data ) {
      return res
        .status(400)
        .json({ message: "bad request: required all parameters" });
    }

    const newStory = new Story({
      category: category.toLowerCase(),
      createdBy: userID,
      data,
    });

    await newStory
      .save()
      .then(() => {
        res.json({ message: "Story added successfully" });
      })
      .catch((err) => {
        next(err);
      });
  } catch (err) {
    console.log("Error Registering" + err);
  }
};

const GetPostDataByQuery = async (req, res, next) => {
  try {
    let stories;
    const category = req.query.category;

    if (!category || category.toLowerCase() == "all") {
      stories = await Story.find({});
    } else {
      stories = await Story.find({ category: category.toLowerCase() });
    }

    res.status(200).json({ count: stories.length, data: stories });
  } catch (error) {
    next(error);
  }
};

const GetBookedMarkedStories = async (req, res, next) => {
  try {
    const userID = req.cookies.userid;
    const resposne = await Story.find({ bookedMarkedBy: userID });
    res.status(200).json({ count: resposne.length, data: resposne });
  } catch (err) {
    next(err);
  }
};

const ToBookmarkStory = async (req, res, next) => {
  try {
    const StoryId = req.params.storyid;
    const userID = req.cookies.userid;
    if (!StoryId) {
      return res.status(400).json({ message: "Bad request" });
    }

    const storyItem = await Story.findById(StoryId);
    if (!storyItem) {
      return res.status(404).json({ message: "No story found" });
    }

    if (storyItem.bookedMarkedBy.includes(userID)) {
      return res.status(400).json({ message: "Story already bookedmarked" });
    }

    await Story.findOneAndUpdate(
      { _id: StoryId },
      { $addToSet: { bookedMarkedBy: userID } }
    );

    res.status(200).json({ message: "Successfully bookedmarked story." });
  } catch (err) {
    next(err);
  }
};

const ToLikeStory = async (req, res, next) => {
  try {
    const StoryId = req.params.storyid;
    const userID = req.cookies.userid;
    if (!StoryId) {
      return res.status(400).json({ message: "Bad request" });
    }

    const storyItem = await Story.findById(StoryId);
    if (!storyItem) {
      return res.status(404).json({ message: "No story found" });
    }

    if (storyItem.likedBy.includes(userID)) {
      return res.status(400).json({ message: "Story already liked" });
    }

    const updatedLike = await Story.findByIdAndUpdate(
      { _id: StoryId },
      { $addToSet: { likedBy: userID }, $inc: { likes: 1 } },
      { new: true }
    );

    res.status(200).json({ message: "Liked story", data: updatedLike.likes });
  } catch (err) {
    next(err);
  }
};

const GetStoryById = async (req, res, next) => {
  try {
    const StoryId = req.params.storyid;
    if (!StoryId) {
      return res.status(400).json({ message: "Bad request" });
    }

    const storyItem = await Story.findById(StoryId);
    if (!storyItem) {
      return res.status(404).json({ message: "No story found" });
    }

    res.status(200).json({data: storyItem});
  } catch (err) {
    next(err);
  }
}

module.exports = {
  AddStory,
  GetPostDataByQuery,
  GetBookedMarkedStories,
  ToBookmarkStory,
  ToLikeStory,
  GetStoryById
};

const Story = require("../models/story");

// Add Story
const AddStory = async (req, res, next) => {
  try {
    const { category, data, userid } = req.body;

    if (!category || !data ) {
      return res
        .status(400)
        .json({ message: "bad request: required all parameters" });
    }

    const newStory = new Story({
      category: category.toLowerCase(),
      createdBy: userid,
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
    const userID = req.params.userid;
    const resposne = await Story.find({ bookedMarkedBy: userID });
    res.status(200).json({ count: resposne.length, data: resposne });
  } catch (err) {
    next(err);
  }
};

const ToBookmarkStory = async (req, res, next) => {
  try {
    const StoryId = req.params.storyid;
    const userID = req.params.userid;
    
    if (!StoryId && !userID) {
      return res.status(400).json({ message: "Bad request" });
    }

    const storyItem = await Story.findById(StoryId);
    if (!storyItem) {
      return res.status(404).json({ message: "No story found" });
    }
 
    if (storyItem.bookedMarkedBy.includes(userID)) {
      await Story.updateOne(
        { _id: StoryId },
        { $pull: { bookedMarkedBy: userID } }
      );
      return res.status(200).json({ message: "Bookmarked removed." });
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
    const userID = req.params.userid;
    
    if (!StoryId && !userID) {
      return res.status(400).json({ message: "Bad request" });
    }

    const storyItem = await Story.findById(StoryId);
    if (!storyItem) {
      return res.status(404).json({ message: "No story found" });
    }

    if (storyItem.likedBy.includes(userID)) {
      await Story.updateOne(
        { _id: StoryId },
        { $pull: { likedBy: userID }, $inc: { likes: -1 }}
      );
      return res.status(200).json({ message: "Story Unliked" });
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

const GetyourStories = async (req, res, next) => {
  try {
    const userID = req.params.userid;
    if (!userID) {
      return res.status(400).json({ message: "Bad request" });
    }

    const yourStories = await Story.find({createdBy: userID});
    if (!yourStories) {
      return res.status(404).json({ message: "No story found" });
    }

    res.status(200).json({data: yourStories});
  } catch (err) {
    next(err);
  }
}

const EditStory = async (req, res, next) => {
  try {
    const storyid = req.params.storyid;
    const updatedDetails = req.body;

    if (!storyid) {
      res.status(400).json({ message: "Bad request" });
    }

    await Story.updateOne(
      { _id: storyid },
      {
        $set: {
          ...updatedDetails,  
        },
      }
    );
    res.status(200).json({ message: "Updated job details" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  AddStory,
  GetPostDataByQuery,
  GetBookedMarkedStories,
  ToBookmarkStory,
  ToLikeStory,
  GetStoryById,
  GetyourStories,
  EditStory
};

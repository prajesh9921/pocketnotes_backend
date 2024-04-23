const Story = require("../models/story");

// Add Story
const AddStory = async (req, res, next) => {
  try {
    const { category, isBookedMarked, bookedMarkedBy, data, createdBy } = req.body;

    if (!category || isBookedMarked == null || !data || !createdBy) {
      return res.status(400).json({ message: "bad request: required all parameters" });
    }

    const newStory = new Story({
      category: category.toLowerCase(),
      isBookedMarked,
      bookedMarkedBy,
      createdBy,
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
      stories = await Story.find({category: category.toLowerCase()});
    }
    
    res.json({data: stories});
  } catch (error) {
    next(error);
  }
}


module.exports = { AddStory, GetPostDataByQuery };

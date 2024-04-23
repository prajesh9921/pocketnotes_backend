const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
})

const storySchema = mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },  
    isBookedMarked: {
      type: Boolean,
      required: true,
    },
    bookedMarkedBy: {
        type: String,
        required: false,
    },
    createdBy: {
      type: String,
      required: true
    },
    data: {
        type: [postSchema],
        required: true
    }
  },
  { timeStamp: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

const Story = mongoose.model("Story", storySchema);

module.exports = Story;

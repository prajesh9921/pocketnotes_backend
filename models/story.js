const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
});

const storySchema = mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    bookedMarkedBy: [
      {
        type: String,
        required: false,
        ref: "users",
      },
    ],
    likedBy: [
      {
        type: String,
        required: false,
        ref: "users",
      },
    ],
    createdBy: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      required: false,
      default: 0,
    },
    data: {
      type: [postSchema],
      required: true,
    },
  },
  { timestamps: true }
);

const Story = mongoose.model("Story", storySchema);

module.exports = Story;

const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
  value: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

const groupSchema = mongoose.Schema(
  {
    grpName: {
      type: String,
      required: true,
    },
    initialLetters: {
      type: String,
      required: true,
    },
    selectedColor: {
      type: String,
      required: true,
    },
    notes: {
      type: [notesSchema],
      required: false,
    },
  },
  { timestamps: true }
);

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;

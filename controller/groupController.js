const Group = require("../models/group");
const mongoose = require('mongoose');

// Add Group
const ToAddGroup = async (req, res, next) => {
  try {
    const { grpName, initialLetters, selectedColor } = req.body;

    if (!grpName || !initialLetters || !selectedColor) {
      return res
        .status(400)
        .json({ message: "bad request: required all parameters" });
    }

    const newgroup = new Group({
      grpName: grpName,
      initialLetters: initialLetters,
      selectedColor: selectedColor,
    });

    await newgroup
      .save()
      .then((result) => {
        res.json({ message: "Group added successfully", result: result });
      })
      .catch((err) => {
        next(err);
      });
  } catch (err) {
    console.log("Error adding group" + err);
  }
};

const ToAddNoteToGroup = async (req, res, next) => {
  try {
    const {groupId, value} = req.body;
    
    if (!groupId || !value) {
      return res.status(400).json({ message: "Bad request" });
    }

    const GroupItem = await Group.findById(groupId);
    if (!GroupItem) {
      return res.status(404).json({ message: "No group found" });
    }

    const result = await Group.findOneAndUpdate(
      {_id: groupId},
      { $push: { notes: {value: value} } },
      { new: true, useFindAndModify: false } 
    );

    console.log(result);

    res.status(200).json({ message: "Successfully added the note to grp.", newData: result });
  } catch (err) {
    next(err);
  }
};


const GetAllData = async (req, res, next) => {
  try {
    AllGroupsData = await Group.find({});
    res.status(200).json({ count: AllGroupsData.length, data: AllGroupsData });
  } catch (error) {
    next(error);
  }
};

const GetSingleGroupData = async (req, res, next) => {
  try {
    const {groupId} = req.params;
    const objectId = new mongoose.Types.ObjectId(groupId);
    AllGroupsData = await Group.findOne({_id: objectId});
    res.status(200).json({ count: AllGroupsData.length, data: AllGroupsData });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  ToAddGroup,
  ToAddNoteToGroup,
  GetAllData,
  GetSingleGroupData
};

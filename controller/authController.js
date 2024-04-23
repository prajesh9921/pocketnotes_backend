const User = require("../models/user");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const RegisterUser = async (req, res) => {
 try {
    const { email, password } = req.body;
    if (!email, !password) {
      res.status(400).json({ message: "Bad request" });
    }
  
    const isExistingUser = await User.findOne({ email: email });
    if (isExistingUser) {
      res.status(409).json({ message: "User already exists" });
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const newUser = new User({
      email: email,
      password: hashedPassword,
    });
  
    await newUser
      .save()
      .then(() => {
        res.status(200).json({ message: "User created successfully" });
      })
      .catch((err) => {
        res.status(500).json({ message: "Error creating user", error: err });
      });
 } catch (err) {
    console.log("Error Registering" + err);
 }
};


module.exports = {RegisterUser};
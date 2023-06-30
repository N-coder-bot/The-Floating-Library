const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
//user login controller.
const userLogin = async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    return res.status(401).json({ success: false, msg: "could not find user" });
  }
  const isValidPassword = await user.isValidPassword(req.body.password);
  if (isValidPassword) {
    const expiresIn = "1d";
    const payload = {
      sub: user._id,
      iat: Date.now(),
    };
    const signedToken = jwt.sign(payload, "adddadd", {
      expiresIn,
    });
    res.json({ token: "Bearer " + signedToken, expiresIn });
  } else {
    res
      .status(401)
      .json({ success: false, msg: "you entered the wrong password" });
  }
};

//signup user controller.
const userSignup = async (req, res, next) => {
  try {
    const data = req.body;
    const user = await User.create(data);
    res.json({ success: true });
  } catch (error) {
    // console.log(error);
    res.status(400).json({ error: "ALREADY EXISTS!" });
  }
};

//get user controller.
const getUser = async (req, res) => {
  res.json({ user: req.user });
};

//update user.
const updateUser = async (req, res) => {
  try {
    let newUsername = req.body.username;
    let newPassword = req.body.password;
    let user = req.user;
    let updatedUser = undefined;
    let canModify = !(await bcrypt.compare(newPassword, user.password));
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);
    //1. case  when there is no new username but there is a new Password.
    if (
      newPassword !== "" &&
      canModify &&
      (newUsername === user.username || newUsername === "")
    ) {
      updatedUser = await User.findOneAndUpdate(
        { _id: req.params.id },
        { password: hash },
        { new: true }
      );
    }
    //2. case when the password is same but username is different.
    else if (
      (!canModify || newPassword === "") &&
      newUsername !== user.username &&
      newUsername !== ""
    ) {
      updatedUser = await User.findOneAndUpdate(
        { _id: req.params.id },
        { username: newUsername },
        { new: true }
      );
    }
    //3. else when both are different.
    else {
      updatedUser = await User.findOneAndUpdate(
        { _id: req.params.id },
        { username: newUsername, password: hash },
        {
          new: true,
        }
      );
    }
    //send successfully updated message.
    res.json({ updateUser, msg: "sucess" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "ALREADY EXISTS!" });
  }
};
module.exports = { userLogin, userSignup, getUser, updateUser };

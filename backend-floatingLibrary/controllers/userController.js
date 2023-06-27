const User = require("../models/User");
const jwt = require("jsonwebtoken");
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
    console.log(error);
    res.status(401);
  }
};

//get user controller.
const getUser = async (req, res) => {
  res.json({ user: req.user });
};
module.exports = { userLogin, userSignup, getUser };

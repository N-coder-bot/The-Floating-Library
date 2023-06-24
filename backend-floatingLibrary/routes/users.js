const User = require("../models/User");
const express = require("express");
const router = express.Router();
const passport = require("passport");
const jsonwebtoken = require("jsonwebtoken");
require("../config/passport");
router.post("/signUp", async (req, res, next) => {
  try {
    const data = req.body;
    const user = new User(data);
    await user.save();
    res.json({ success: true, user: user });
  } catch (error) {}
});
router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.status(200).json({
      success: true,
      msg: "You are successfully authenticated to this route!",
    });
  }
);
router.get("/login", (req, res) => {
  res.render("login");
});
router.post("/login", async (req, res, next) => {
  console.log(req.body.username);
  const user = await User.findOne({ username: req.body.username });
  console.log(user);
  if (!user) {
    return res.status(401).json({ success: false, msg: "could not find user" });
  }
  const isValidPassword = await user.isValidPassword(req.body.password);
  if (isValidPassword) {
    const expiresIn = "1d";
    console.log(user);
    const payload = {
      sub: user._id,
      iat: Date.now(),
    };
    const signedToken = jsonwebtoken.sign(payload, "adddadd", {
      expiresIn,
    });
    res.json({ token: "Bearer " + signedToken, expiresIn });
  } else {
    res
      .status(401)
      .json({ success: false, msg: "you entered the wrong password" });
  }
});
module.exports = router;

const User = require("../models/User");
const express = require("express");
const router = express.Router();
const {
  userLogin,
  userSignup,
  getUser,
} = require("../controllers/userController");
const auth = require("../middlewares/auth");
const verify = require("../middlewares/verify");
require("../config/passport");
//user signup .
router.post("/signUp", userSignup);
//user login .
router.post("/login", userLogin);
//user verify.
router.get("/verify", auth, verify);
//get user.
router.get("/user", auth, getUser);
// router.get("/login", (req, res) => {
//   res.render("login");
// });
module.exports = router;

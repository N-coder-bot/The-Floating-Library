const User = require("../models/User");
const express = require("express");
const router = express.Router();
const {
  userLogin,
  userSignup,
  getUser,
  updateUser,
  getBooks,
} = require("../controllers/userController");
const auth = require("../middlewares/auth");
const verify = require("../middlewares/verify");
require("../config/passport");
//user signup.
router.post("/signUp", userSignup);
//user login.
router.post("/login", userLogin);
//user verify.
router.get("/verify", auth, verify);
//get user.
router.get("/user", auth, getUser);
//update user.
router.put("/updateUser/:id", auth, updateUser);
//get user specific books.
router.get("/user/books", auth, getBooks);
module.exports = router;

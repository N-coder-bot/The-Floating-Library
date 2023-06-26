const auth = require("../middlewares/auth");

module.exports = (req, res, next) => {
  // console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false });
  }
};

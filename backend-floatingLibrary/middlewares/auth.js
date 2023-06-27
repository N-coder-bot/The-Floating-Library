const passport = require("passport");
auth = passport.authenticate("jwt", {
  session: false,
});
module.exports = auth;

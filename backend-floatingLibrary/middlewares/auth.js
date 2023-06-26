const passport = require("passport");
exports.auth = passport.authenticate("jwt", {
  session: false,
});

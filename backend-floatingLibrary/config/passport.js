const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/User");
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "adddadd",
};

// The JWT payload is passed into the verify callback
// console.log("hi bitch");
module.exports = (passport) => {
  // The JWT payload is passed into the verify callback
  passport.use(
    new JwtStrategy(options, async function (jwt_payload, done) {
      // console.log(jwt_payload);

      // We will assign the `sub` property on the JWT to the database ID of user
      const user = await User.findOne({ _id: jwt_payload.sub });
      try {
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (error) {
        return done(null, error);
      }
    })
  );
};

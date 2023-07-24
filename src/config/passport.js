passport = require("passport");
LocalStrategy = require("passport-local").Strategy

User= require("../models/User.js");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      // Match Email's User
      const user = await User.findOne({ email: email });

      if (!user) {
        return done(null, false, { message: "User not found" });
      }

      // Match Password's User
      const isMatch = await user.matchPassword(password);
      if (!isMatch)
        return done(null, false, { message: "Incorrect password" });
      
      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

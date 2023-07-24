express = require("express");
note = require("../models/Note");
user = require("../models/User");
passport = require('passport')

app.get("/users/signup", async (req, res) => {
  res.render("users/signup");
});

app.get("/users/signin", async (req, res) => {
  res.render("users/signin");
});

app.post("/users/signup", async (req, res) => {
  const { name, email, password, confirm_password } = req.body;
  const errors = [];
  if (name.length <= 0) {
    errors.push({ text: "Please insert your name" });
  }
  if (email.length <= 0) {
    errors.push({ text: "Please insert your email" });
  }
  if (password != confirm_password) {
    errors.push({ text: "Passwords do not match" });
  }
  if (password.length < 4) {
    errors.push({ text: "Password must be at least 4 characters" });
  }
  if (errors.length > 0) {
    res.render("users/signup", {
      errors,
      name,
      email,
      password,
      confirm_password,
    });
  } else {
    userEmail = await user.findOne({ email: email });
    if (userEmail) {
      req.flash("error_msg", "Email is already taken");
      res.redirect("/users/signup");
    } else {
      newUser = new user({ name, email, password });
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash("success_msg", "You signed up successfully");
      res.redirect("/users/signin");
    }
  }
});

app.post("/users/signin", passport.authenticate('local', {
  successRedirect: '/notes',
  failureRedirect: '/users/signin',
  failureFlash: true
}));

app.get("/users/logout", async (req, res) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
})});

app = express.Router();

module.exports = app;

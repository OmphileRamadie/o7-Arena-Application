const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2");
var localStrategy = require("passport-local").Strategy;
const keys = require("./keys");
const User = require("../models/user.model.js");
var bcrypt = require("bcryptjs");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      //options for stratergy
      callbackURL: "/google-login/redirect",
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
    },

    (accessToken, refreshToken, profile, done) => {
      console.log("Passport callback function fired");
      console.log(profile);
      User.findOne({ email: profile.emails[0].value }).then((currentUser) => {
        if (currentUser) {
          //have this user in our db
          console.log(" User " + currentUser);
          done(null, currentUser);
        } else {
          //user not saved in DB so save
          new User({
            name: profile.given_name,
            email: profile.emails[0].value,
            password: profile.id,
          })
            .save()
            .then((newUser) => {
              console.log("new User " + newUser);
              done(null, newUser);
            });
        }
      });
    }
  )
);

passport.use(
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    (email, password, done) => {
      User.findOne({ email: email }, (err, user) => {
        if (err) throw err;
        if (!user) return done(null, false);
        bcrypt.compare(password, user.password, function (err, res) {
          if (err) throw err;
          if (res === true) {
            done(null, user);
          } else {
            done(null, false);
          }
        });
      });
    }
  )
);

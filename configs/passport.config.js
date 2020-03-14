const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");

const User = require("../models/User.model");

// PASSPORT: Serializado / des-serializado Usuario
passport.serializeUser((user, cb) => cb(null, user._id));
passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});

// PASSPORT module
passport.use(
  new LocalStrategy(
    {
      passReqToCallback: true
    },
    (req, username, password, next) => {
      User.findOne({
        username
      })
        .then(theUser => {
          if (!theUser)
            return next(null, false, {
              message: "Incorrect Username"
            });
          if (!bcrypt.compareSync(password, theUser.password))
            return next(null, false, {
              message: "Incorrect Password"
            });
          return next(null, theUser);
        })
        .catch(err => next(err));
    }
  )
);

// Export config Passapot & confing
module.exports = app => {
  
  app.use(
    session({
      secret: "webmad1019",
      resave: true,
      saveUninitialized: true,
      store: new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl: 24 * 60 * 60 // 1 day
      })
    })
  );

  // init di Passport
  app.use(passport.initialize());
  app.use(passport.session());
};

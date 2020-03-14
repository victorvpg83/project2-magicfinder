const express = require("express");
const passport = require("passport");
const router = express.Router();

const User = require("../models/User.model");
const Card = require("../models/Card.model");
const ensureLogin = require("connect-ensure-login");

const uploadCloud = require("../configs/cloudinary.config");
const multer = require("multer");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

//// LOG IN MODULE

router.get("/succes", (req, res, next) => {
  res.render("auth/succes");
});

router.get("/login", (req, res, next) => {
  res.render("auth/login", { message: req.flash("error") });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
    failureFlash: true,
    passReqToCallback: true
  })
);

//// SIGN UP MODULE

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", uploadCloud.single("imgFile"), (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }

    const { username, email, password, city, adress } = req.body;

    const imgPath = req.file.url;
    const imgName = req.file.originalname;

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass,
      email,
      imgName: imgName,
      imgPath: imgPath,
      city,
      adress,
    });

    console.log(newUser);

    newUser
      .save()
      .then(() => {
        res.redirect("/auth/login");
      })
      .catch(err => {
        res.render("auth/signup", { message: "Something went wrong" });
      });
  });
});

/// LOG OUT

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

/// PRIVATE AREA AUTH

router.get("/privatepage", ensureLogin.ensureLoggedIn(), (req, res) => {
  User.findById(req.user._id)
    .populate("cards")
    .then(allCards => res.render("auth/private", { 
      allCards,
      user: req.user
     }))
    .catch(err => console.log(err));
});



/// Delete de cards en la collection de lo usuario
router.get("/privatepage/delete/:id", ensureLogin.ensureLoggedIn(), (req, res) => {
  console.log("click");
  console.log(req.params.id);

  User.findByIdAndUpdate(req.user._id,  {
    $pull: { 
    cards: req.params.id,
    cardonsale:req.params.id
  }
  })
    .then(() => res.redirect("/auth/privatepage"))
    .catch(err => console.log(err));  
   
});


/// Sell card en la collection de lo usuario
router.get("/privatepage/sell/:id", ensureLogin.ensureLoggedIn(), (req, res) => {
 console.log("click");
  console.log(req.params.id);

User.findByIdAndUpdate(req.user._id, {
  $push: { cardonsale: req.params.id },
  
})
  .then(() => res.redirect("/auth/privatepage"))
  .catch(err => console.log(err));
  

});

//// Edit profile detail

router.get("/privatepage/edit/:id", ensureLogin.ensureLoggedIn(), (req, res) => {
  User.findById(req.user._id)
    .then(userData => res.render("auth/edit", {userData}))
    .catch(err => console.log(err));
});


router.post("/privatepage/edit/:id", ensureLogin.ensureLoggedIn(), (req, res) => {
  const { username, email, city, adress} = req.body;
  console.log(req.body)
   
  User.findByIdAndUpdate(req.user._id, { username, email, city, adress })
    .then(() => res.redirect("/auth/privatepage"))
    .catch(err => console.log(err));
});




module.exports = router;

const express = require("express");
const router = express.Router();
const User = require("../models/User.model");

router.get("/", function (req, res) {
  
  User.find()
    .populate("cardonsale")
    .then(allUsers => {
 
      res.render("market", { 
        users: allUsers,
        user: req.user
      });
      
    })

    .catch(err => console.log("Error consultando la BBDD: ", err));
});

module.exports = router;

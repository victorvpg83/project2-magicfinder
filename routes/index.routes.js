const express = require('express');
const router = express.Router();
const Event = require("../models/Event.model")
const api = require("../public/javascripts/api")

router.get("/", (req, res) => {

  api.getCards()
    .then(response => {

      let cards

      cards = response.data.filter(elm => elm.lang.includes("en"))
      res.render("index", {
        user: req.user,
        cards
      });

    })
    .catch(err => console.log(err))
});

module.exports = router;
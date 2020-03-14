const express = require("express");
const router = express.Router();

const Card = require("../../models/Card.model");
const User = require("../../models/User.model");

router.post("/addCard", (req, res) => {
  // console.log("holaaa estamos en el back");
  // console.log(req.body);
  const {
    cardName,
    cardImage,
    cardDesc,
    cardRarity,
    cardPrice
  } = req.body.cardDetail;
  let newCard = new Card({
    cardName,
    cardImage,
    cardDesc,
    cardRarity,
    cardPrice
  });

  newCard
    .save()
    .then(newCard => {
      console.log("card created ---->" + newCard);
      // res.render("cardfinder", { message: "card created" })

      User.findByIdAndUpdate(req.user._id, {
        $addToSet: { cards: newCard._id }
      })
        .then(user => {
          console.log(user);
          res.render("cardfinder", { message: "card created" });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

module.exports = router;
